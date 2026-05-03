
Action: file_editor create /app/README.md --file-text "# 🗳️ CivicAI — AI Election Process Assistant (India)

> A full-stack, AI-powered web application that helps first-time Indian voters understand the **election process, timelines, and steps** in a simple, interactive way.

CivicAI is a **non-partisan, educational** companion for India's elections. It blends a Claude-powered chat assistant, an interactive election timeline, a step-by-step voting guide, and a knowledge-check quiz — all wrapped in a clean, civic, modern UI.

---

## ✨ Features

| Module | What it does |
|---|---|
| 🤖 **AI Chat Assistant** | Floating chatbot powered by **Claude Sonnet 4.5**. Ask anything about Indian elections in plain English. Multi-turn conversation, persisted in MongoDB. |
| 📅 **Interactive Timeline** | 5 clickable election stages — *Announcement → Nomination → Campaigning → Voting Day → Counting & Results* — with key points and explanations. |
| 🧾 **Voting Guide** | 6-step walkthrough from eligibility check to casting your vote on the EVM. Progress bar, prev/next navigation, mark-done state. |
| 🧠 **Civic Quiz** | 8 MCQs with instant scoring, correct answers, and explanations. Try-again support. |
| 🇮🇳 **India-specific** | EPIC, EVM, VVPAT, Form 6/8/26, ECI, NVSP, MCC, NOTA, cVIGIL — all the real terms first-time voters meet. |

---

## 🏗️ Tech Stack

**Frontend** &nbsp;·&nbsp; React 19 · React Router v7 · Tailwind CSS · shadcn/ui · lucide-react · sonner · axios
**Backend** &nbsp;·&nbsp; FastAPI · Motor (async MongoDB) · Pydantic v2 · `emergentintegrations` (Claude Sonnet 4.5)
**Database** &nbsp;·&nbsp; MongoDB (chat message persistence)
**AI** &nbsp;·&nbsp; Anthropic **Claude Sonnet 4.5** (`claude-sonnet-4-5-20250929`) via Emergent Universal LLM Key

---

## 📁 Project Structure

```
/app/
├── backend/
│   ├── .env                  # MONGO_URL, DB_NAME, CORS_ORIGINS, EMERGENT_LLM_KEY
│   ├── requirements.txt
│   ├── server.py             # FastAPI app + /api router (7 endpoints)
│   └── election_data.py      # India election data + Claude system prompt
│
├── frontend/
│   ├── .env                  # REACT_APP_BACKEND_URL
│   ├── package.json
│   └── src/
│       ├── App.js            # Router + global Chatbot/Navbar/Footer
│       ├── index.css         # Civic theme tokens, fonts, animations
│       ├── lib/api.js        # Axios client + endpoint helpers
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── Chatbot.jsx   # Floating Claude-powered chat widget
│       │   └── ui/           # shadcn/ui primitives
│       └── pages/
│           ├── Home.jsx
│           ├── TimelinePage.jsx
│           ├── GuidePage.jsx
│           └── QuizPage.jsx
│
└── design_guidelines.json
```

---

## 🔌 API Reference

All backend routes are prefixed with **`/api`**.

| Method | Path | Description |
|---|---|---|
| `GET`  | `/api/` | Health check |
| `GET`  | `/api/timeline` | Returns 5 election stages |
| `GET`  | `/api/voting-guide` | Returns 6 voting-guide steps |
| `GET`  | `/api/quiz` | Returns 8 MCQs (answer keys are stripped) |
| `POST` | `/api/quiz/submit` | Body: `{ \"answers\": { \"q1\": 1, \"q2\": 0, ... } }` → score + breakdown |
| `POST` | `/api/chat` | Body: `{ \"message\": \"...\", \"session_id\": \"...\" }` → Claude reply + session_id |
| `GET`  | `/api/chat/history/{session_id}` | Persisted multi-turn history |

### Sample request

```bash
curl -X POST $REACT_APP_BACKEND_URL/api/chat \
  -H \"Content-Type: application/json\" \
  -d '{\"message\":\"How do I register as a first-time voter?\"}'
```

---

## 🚀 Getting Started

The app is running inside the Emergent container; **services auto-start via supervisor**. The notes below are for local/forked setups.

### 1. Environment variables

`backend/.env`
```
MONGO_URL=\"mongodb://localhost:27017\"
DB_NAME=\"test_database\"
CORS_ORIGINS=\"*\"
EMERGENT_LLM_KEY=sk-emergent-xxxxxxxxxxxxx
```

`frontend/.env`
```
REACT_APP_BACKEND_URL=https://<your-preview-host>
```

> The **EMERGENT_LLM_KEY** is a Universal Key that works across OpenAI / Anthropic / Gemini through `emergentintegrations`. You can top-up balance from `Profile → Universal Key`.

### 2. Backend (FastAPI)

```bash
cd /app/backend
pip install -r requirements.txt
# In Emergent: managed by supervisor at 0.0.0.0:8001
sudo supervisorctl restart backend
```

### 3. Frontend (React)

```bash
cd /app/frontend
yarn install      # use yarn — never npm
sudo supervisorctl restart frontend
```

### 4. Open the app

Visit `REACT_APP_BACKEND_URL` (without `/api`) in your browser.

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Primary (Navy) | `#1E3A8A` | Buttons, navbar, primary actions |
| Accent (Saffron) | `#EA580C` | CTA accents, \"How to vote\" highlight |
| Success (Green) | `#16A34A` | Quiz correct, completed steps |
| Background | `#F8FAFC` | App canvas |
| Heading font | **Outfit** | Display headings |
| Body font | **IBM Plex Sans** | Body copy |

Designed in **Swiss / High-Contrast** archetype optimised for civic education — generous whitespace, crisp cards, subtle animations.

---

## 🧪 Testing

### Quick API smoke test
```bash
API=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)

curl -s $API/api/timeline      | jq '.stages | length'
curl -s $API/api/voting-guide  | jq '.steps  | length'
curl -s $API/api/quiz          | jq '.questions | length'

curl -s -X POST $API/api/quiz/submit \
  -H \"Content-Type: application/json\" \
  -d '{\"answers\":{\"q1\":1,\"q2\":2,\"q3\":1,\"q4\":2,\"q5\":0,\"q6\":1,\"q7\":2,\"q8\":1}}' | jq

curl -s -X POST $API/api/chat \
  -H \"Content-Type: application/json\" \
  -d '{\"message\":\"What is VVPAT?\"}' | jq
```

---

## 🧠 AI Behaviour & Safety

The chatbot is grounded by a strict system prompt (`election_data.SYSTEM_PROMPT`):

- ✅ Non-partisan, never endorses or criticises any party / candidate / leader
- ✅ Uses simple language for first-time voters
- ✅ Cites official sources (ECI, NVSP, Voter Helpline, cVIGIL)
- ✅ Politely refuses political predictions or opinion questions
- ✅ Redirects off-topic queries back to Indian-election context

---

## 🔐 Security Notes

- **Quiz answers are never sent to the client.** `GET /api/quiz` strips `answer_index` and `explanation`; they're only revealed by `POST /api/quiz/submit`.
- **Mongo `_id` is excluded** from every chat-history query to prevent ObjectId serialization leaks.
- **Chat sessions** are tracked client-side via a `session_id` stored in `localStorage`.

---

## 🗺️ Roadmap

- [ ] Voter dashboard (saved quiz scores, bookmarks) with email + JWT auth
- [ ] Multi-language support (English · Hindi · Telugu · Tamil)
- [ ] Polling-station locator (geolocation + ECI API)
- [ ] Voice input/output for accessibility
- [ ] Social share cards for quiz results

---

## 📝 Disclaimer

CivicAI is an **educational, non-affiliated** tool. For official information, schedules, and procedures always refer to the **[Election Commission of India](https://eci.gov.in)**.

---

## 📄 License

MIT — built on the Emergent platform.
"
Observation: Overwrite successful: /app/README.md