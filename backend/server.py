from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import json
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from difflib import get_close_matches

# from emergentintegrations.llm.chat import LlmChat, UserMessage

from election_data import (
    TIMELINE_STAGES,
    VOTING_GUIDE_STEPS,
    QUIZ_QUESTIONS,
    SYSTEM_PROMPT,
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB
mongo_url = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get("DB_NAME", "civic_ai")]

EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY")

# ---- Load election FAQ dataset ----
_DATASET_PATH = ROOT_DIR / "data" / "election_dataset.json"
try:
    with open(_DATASET_PATH, encoding="utf-8") as _f:
        ELECTION_FAQ: List[dict] = json.load(_f)
except FileNotFoundError:
    ELECTION_FAQ = []
    logging.warning("election_dataset.json not found at %s", _DATASET_PATH)

_FAQ_QUESTIONS = [item["question"] for item in ELECTION_FAQ]


def _dataset_answer(query: str) -> Optional[str]:
    """Return the best-matching answer from the dataset, or None."""
    q = query.strip()
    # 1. Exact substring match (case-insensitive)
    q_lower = q.lower()
    for item in ELECTION_FAQ:
        if q_lower in item["question"].lower() or item["question"].lower() in q_lower:
            return item["answer"]
    # 2. Fuzzy close match
    matches = get_close_matches(q, _FAQ_QUESTIONS, n=1, cutoff=0.45)
    if matches:
        for item in ELECTION_FAQ:
            if item["question"] == matches[0]:
                return item["answer"]
    # 3. Keyword fallback — scan individual words (length > 4)
    words = [w for w in q_lower.split() if len(w) > 4]
    for word in words:
        for item in ELECTION_FAQ:
            if word in item["question"].lower():
                return item["answer"]
    return None

app = FastAPI(title="AI Election Process Assistant")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    message: str


class ChatResponse(BaseModel):
    session_id: str
    reply: str
    timestamp: str


class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    role: str  # "user" | "assistant"
    content: str
    timestamp: str


class QuizSubmission(BaseModel):
    answers: dict  # {"q1": 1, "q2": 0, ...}


class QuizResult(BaseModel):
    score: int
    total: int
    percentage: float
    breakdown: List[dict]


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"status": "ok", "service": "CivicAI Election Assistant"}


@api_router.get("/timeline")
async def get_timeline():
    return {"stages": TIMELINE_STAGES}


@api_router.get("/voting-guide")
async def get_voting_guide():
    return {"steps": VOTING_GUIDE_STEPS}


@api_router.get("/quiz")
async def get_quiz():
    # Strip answer_index & explanation when serving questions
    public = [
        {"id": q["id"], "question": q["question"], "options": q["options"]}
        for q in QUIZ_QUESTIONS
    ]
    return {"questions": public}


@api_router.post("/quiz/submit", response_model=QuizResult)
async def submit_quiz(submission: QuizSubmission):
    breakdown = []
    score = 0
    for q in QUIZ_QUESTIONS:
        user_choice = submission.answers.get(q["id"])
        is_correct = user_choice == q["answer_index"]
        if is_correct:
            score += 1
        breakdown.append({
            "id": q["id"],
            "question": q["question"],
            "your_answer_index": user_choice,
            "correct_answer_index": q["answer_index"],
            "correct_answer": q["options"][q["answer_index"]],
            "is_correct": is_correct,
            "explanation": q["explanation"],
        })
    total = len(QUIZ_QUESTIONS)
    return QuizResult(
        score=score,
        total=total,
        percentage=round((score / total) * 100, 1),
        breakdown=breakdown,
    )


@api_router.get("/faq")
async def get_faq():
    """Return the full election FAQ dataset."""
    return {"faq": ELECTION_FAQ, "count": len(ELECTION_FAQ)}


@api_router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    if not EMERGENT_LLM_KEY:
        # Dataset-powered response engine (no AI key required)
        answer = _dataset_answer(req.message)
        if answer:
            reply = answer
        else:
            reply = (
                "I couldn't find a specific answer for that. "
                "Try asking about: voter eligibility, how to register, voter ID, "
                "EVM, VVPAT, NOTA, polling booth, election timeline, or Model Code of Conduct."
            )

        session_id = req.session_id or str(uuid.uuid4())
        now_iso = datetime.now(timezone.utc).isoformat()
        return ChatResponse(
            session_id=session_id,
            reply=reply,
            timestamp=now_iso,
        )

    session_id = req.session_id or str(uuid.uuid4())
    now_iso = datetime.now(timezone.utc).isoformat()

    # persist user message
    user_doc = {
        "id": str(uuid.uuid4()),
        "session_id": session_id,
        "role": "user",
        "content": req.message,
        "timestamp": now_iso,
    }
    try:
        await db.chat_messages.insert_one(dict(user_doc))
    except Exception:
        pass # Ignore DB errors in demo if mongo is not running

    try:
        llm = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=SYSTEM_PROMPT,
        ).with_model("anthropic", "claude-sonnet-4-5-20250929")

        response_text = await llm.send_message(UserMessage(text=req.message))
    except Exception as e:
        logging.exception("LLM call failed")
        raise HTTPException(status_code=502, detail=f"LLM error: {e}") from e

    reply_iso = datetime.now(timezone.utc).isoformat()
    bot_doc = {
        "id": str(uuid.uuid4()),
        "session_id": session_id,
        "role": "assistant",
        "content": response_text,
        "timestamp": reply_iso,
    }
    try:
        await db.chat_messages.insert_one(dict(bot_doc))
    except Exception:
        pass

    return ChatResponse(session_id=session_id, reply=response_text, timestamp=reply_iso)


@api_router.get("/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    try:
        docs = (
            await db.chat_messages.find(
                {"session_id": session_id}, {"_id": 0}
            )
            .sort("timestamp", 1)
            .to_list(500)
        )
    except Exception:
        docs = []
    return {"session_id": session_id, "messages": docs}


# Mount router & middleware
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)