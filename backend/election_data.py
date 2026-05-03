"""Static India-specific election data for the AI Election Assistant."""

TIMELINE_STAGES = [
    {
        "id": "announcement",
        "stage": "Announcement",
        "icon": "Megaphone",
        "color": "blue",
        "duration": "Day 0",
        "short": "ECI declares the schedule and Model Code of Conduct kicks in.",
        "description": (
            "The Election Commission of India (ECI) holds a press conference to announce "
            "the election schedule. From the moment of announcement, the Model Code of "
            "Conduct (MCC) comes into force. The MCC restricts new policy announcements, "
            "transfers of officials, and freebies until results are declared."
        ),
        "key_points": [
            "ECI releases the formal Press Note with poll dates",
            "Model Code of Conduct comes into immediate effect",
            "Government cannot announce new schemes or transfers",
            "Election expenditure tracking begins for candidates",
        ],
    },
    {
        "id": "nomination",
        "stage": "Nomination",
        "icon": "FileSignature",
        "color": "indigo",
        "duration": "Days 1-7",
        "short": "Candidates file nomination papers with deposits and affidavits.",
        "description": (
            "Candidates file Form 2A/2B nomination papers before the Returning Officer "
            "(RO). They must declare assets, criminal record, and educational background "
            "via Form 26 affidavit. A security deposit (₹25,000 for Lok Sabha; ₹10,000 "
            "for Assembly; halved for SC/ST) is paid. The RO scrutinises papers and "
            "candidates may withdraw within the prescribed window."
        ),
        "key_points": [
            "Submission of Form 2A (Lok Sabha) or Form 2B (Assembly)",
            "Mandatory Form 26 affidavit listing assets & cases",
            "Security deposit of ₹25,000 (general) for Lok Sabha",
            "Scrutiny followed by withdrawal day",
        ],
    },
    {
        "id": "campaigning",
        "stage": "Campaigning",
        "icon": "Speaker",
        "color": "orange",
        "duration": "~14 days",
        "short": "Parties and candidates campaign; expenditure is tracked closely.",
        "description": (
            "Candidates campaign through rallies, door-to-door canvassing, social media, "
            "and print/TV ads. The ECI caps Lok Sabha expenditure at ₹95 lakh per "
            "candidate (₹75 lakh for smaller states) and Assembly at ₹40 lakh. All "
            "advertising must be pre-certified by the Media Certification & Monitoring "
            "Committee (MCMC). Campaigning must end 48 hours before polling — this is "
            "the 'silence period'."
        ),
        "key_points": [
            "Lok Sabha expenditure cap: ₹95 lakh per candidate",
            "Pre-certification of all political ads via MCMC",
            "Use of cVIGIL app by citizens to report MCC violations",
            "Silence period: campaigning ends 48 hours before poll",
        ],
    },
    {
        "id": "voting",
        "stage": "Voting Day",
        "icon": "Vote",
        "color": "green",
        "duration": "Poll Day",
        "short": "Voters cast votes via EVM with VVPAT verification.",
        "description": (
            "Polling stations open from 7:00 AM to 6:00 PM (timings can vary). Voters "
            "present an EPIC or one of 12 alternate ID proofs. After verification, the "
            "indelible ink mark is applied, the voter signs Form 17A, and casts a vote "
            "on the EVM. The VVPAT prints a paper slip visible for 7 seconds — confirming "
            "the vote — before dropping into a sealed box. NOTA is available as an option."
        ),
        "key_points": [
            "Poll hours typically 7:00 AM – 6:00 PM",
            "EPIC or 12 alternate ID documents accepted",
            "EVM + VVPAT verification of every vote",
            "NOTA (None of the Above) available as last option",
        ],
    },
    {
        "id": "counting",
        "stage": "Counting & Results",
        "icon": "BarChart3",
        "color": "purple",
        "duration": "Result Day",
        "short": "Votes are counted at strongrooms; results declared by ECI.",
        "description": (
            "EVMs are stored in sealed strongrooms under CRPF guard until counting day. "
            "Counting happens centre-wise under the Returning Officer. Postal ballots "
            "and ETPBS (service voters) are counted first, followed by EVM rounds. "
            "5 randomly chosen VVPAT slips per Assembly segment are tallied with EVM "
            "counts. The RO declares the winner and issues Form 21C (Certificate of "
            "Election)."
        ),
        "key_points": [
            "Strongrooms sealed with CCTV, CRPF guard",
            "Postal ballots & ETPBS counted first",
            "5 VVPAT slips per Assembly segment tallied",
            "Form 21C — Certificate of Election issued",
        ],
    },
]

VOTING_GUIDE_STEPS = [
    {
        "step": 1,
        "title": "Check Your Eligibility",
        "icon": "UserCheck",
        "summary": "Confirm you meet basic criteria to vote in India.",
        "details": [
            "You must be an Indian citizen",
            "Minimum 18 years of age on the qualifying date (1st January)",
            "Ordinary resident of the constituency",
            "Not disqualified under law (unsound mind, certain criminal convictions)",
        ],
    },
    {
        "step": 2,
        "title": "Register as a Voter",
        "icon": "ClipboardList",
        "summary": "Enrol via Form 6 on the National Voters' Service Portal (NVSP).",
        "details": [
            "Visit voters.eci.gov.in or use the Voter Helpline app",
            "Fill Form 6 (new voter) with proof of age & address",
            "Upload a passport-size photo",
            "Track application status using the reference ID",
        ],
    },
    {
        "step": 3,
        "title": "Receive Your EPIC (Voter ID)",
        "icon": "IdCard",
        "summary": "Booth Level Officer verifies and issues your Elector Photo Identity Card.",
        "details": [
            "BLO conducts physical verification at your address",
            "EPIC card is delivered to your address (or download e-EPIC PDF)",
            "Verify your name on the electoral roll at voters.eci.gov.in",
            "If you move, file Form 8 to update address",
        ],
    },
    {
        "step": 4,
        "title": "Find Your Polling Booth",
        "icon": "MapPin",
        "summary": "Locate your assigned booth before poll day.",
        "details": [
            "Use 'Know Your Polling Station' on voters.eci.gov.in",
            "Or search by EPIC number on the Voter Helpline app",
            "Note booth address, part number, and serial number",
            "ECI also sends a Voter Information Slip (VIS) before polling",
        ],
    },
    {
        "step": 5,
        "title": "Cast Your Vote",
        "icon": "Vote",
        "summary": "On poll day — verify, ink, press, verify VVPAT.",
        "details": [
            "Carry EPIC or alternate ID (Aadhaar, PAN, Passport, etc.)",
            "Polling officer verifies you on the electoral roll",
            "Indelible ink applied on left index finger; sign Form 17A",
            "Press button next to your candidate on the EVM",
            "Verify the 7-second VVPAT slip showing your choice",
        ],
    },
    {
        "step": 6,
        "title": "Track Results",
        "icon": "BarChart3",
        "summary": "Follow live counting on the official ECI results portal.",
        "details": [
            "Live results on results.eci.gov.in",
            "Trends update round-by-round throughout counting day",
            "Final results published after RO signs Form 21C",
            "Voter turnout statistics available constituency-wise",
        ],
    },
]

QUIZ_QUESTIONS = [
    {
        "id": "q1",
        "question": "What is the minimum age to vote in Indian general elections?",
        "options": ["16 years", "18 years", "21 years", "25 years"],
        "answer_index": 1,
        "explanation": "The 61st Constitutional Amendment (1989) lowered the voting age from 21 to 18 years.",
    },
    {
        "id": "q2",
        "question": "Which constitutional body conducts elections in India?",
        "options": [
            "Supreme Court of India",
            "Ministry of Law and Justice",
            "Election Commission of India (ECI)",
            "Lok Sabha Secretariat",
        ],
        "answer_index": 2,
        "explanation": "Article 324 vests the superintendence, direction, and control of elections in the Election Commission of India.",
    },
    {
        "id": "q3",
        "question": "What does VVPAT stand for?",
        "options": [
            "Vote Verification Paper Audit Trail",
            "Voter Verifiable Paper Audit Trail",
            "Verified Voting Paper Authentication Tool",
            "Voter Vetting Paper Authority Tally",
        ],
        "answer_index": 1,
        "explanation": "VVPAT (Voter Verifiable Paper Audit Trail) prints a slip visible for 7 seconds confirming your EVM vote.",
    },
    {
        "id": "q4",
        "question": "When does election campaigning officially end before polling?",
        "options": ["12 hours before", "24 hours before", "48 hours before", "72 hours before"],
        "answer_index": 2,
        "explanation": "The 'silence period' begins 48 hours before polling closes — no public campaigning is allowed.",
    },
    {
        "id": "q5",
        "question": "Which form is used by a new voter to register on the electoral roll?",
        "options": ["Form 6", "Form 8", "Form 17A", "Form 26"],
        "answer_index": 0,
        "explanation": "Form 6 is used for fresh inclusion in the electoral roll. Form 8 is for corrections/shifting; Form 26 is the candidate affidavit.",
    },
    {
        "id": "q6",
        "question": "What does NOTA on the EVM mean?",
        "options": [
            "No Object To Anyone",
            "None Of The Above",
            "New Order To Authorities",
            "National Open Trust Authority",
        ],
        "answer_index": 1,
        "explanation": "NOTA — None Of The Above — lets a voter formally reject all candidates while still recording their participation.",
    },
    {
        "id": "q7",
        "question": "Which document is the most common Voter ID in India?",
        "options": ["Aadhaar Card", "PAN Card", "EPIC", "Driving Licence"],
        "answer_index": 2,
        "explanation": "EPIC (Elector Photo Identity Card) is the official Voter ID. Aadhaar/PAN/DL are accepted as alternates on poll day.",
    },
    {
        "id": "q8",
        "question": "What is the Model Code of Conduct (MCC)?",
        "options": [
            "A dress code for polling officers",
            "Rules for political parties from the day elections are announced",
            "A code for citizens at polling booths",
            "The candidate nomination form",
        ],
        "answer_index": 1,
        "explanation": "The MCC is a set of guidelines for parties and candidates that becomes binding from poll announcement until results.",
    },
]

SYSTEM_PROMPT = (
    "You are CivicAI — an AI Election Guide Assistant focused on Indian elections.\n\n"
    "Your job is to explain India's election processes in a simple, neutral, and "
    "educational way for first-time voters and curious citizens.\n\n"
    "Strict rules:\n"
    "- Be unbiased and non-political. Never endorse, criticise, or recommend any "
    "  political party, candidate, ideology, or leader.\n"
    "- Use simple, friendly language. Assume the reader is a first-time voter.\n"
    "- Provide step-by-step explanations with bullet points where helpful.\n"
    "- Cite official Indian sources where relevant: ECI, voters.eci.gov.in, "
    "  Voter Helpline app, NVSP, cVIGIL app.\n"
    "- If a question is outside Indian elections / civic education, politely "
    "  redirect: 'I can only help with India's election process.'\n"
    "- If asked for predictions, party preference, or political opinion, refuse "
    "  politely and offer factual context instead.\n"
    "- Encourage civic awareness and informed voting.\n\n"
    "Topics you handle: voter eligibility, voter ID (EPIC), Form 6/8/Form 26, "
    "registration, polling booth, EVM & VVPAT, NOTA, Model Code of Conduct, "
    "counting & results, election timeline phases, cVIGIL.\n\n"
    "Format every answer:\n"
    "1. A short 1-2 line plain-English summary.\n"
    "2. A bulleted breakdown of steps or key points.\n"
    "3. (Optional) A small example or tip.\n\n"
    "Keep replies under 250 words unless the user explicitly asks for more depth."
)