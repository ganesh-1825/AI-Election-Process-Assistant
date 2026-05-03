import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
export const API = `${BACKEND_URL}/api`;

export const apiClient = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
  timeout: 60000,
});

export const fetchTimeline = () => apiClient.get("/timeline").then((r) => r.data);
export const fetchGuide = () => apiClient.get("/voting-guide").then((r) => r.data);
export const fetchQuiz = () => apiClient.get("/quiz").then((r) => r.data);
export const fetchFaq = () => apiClient.get("/faq").then((r) => r.data);
export const submitQuiz = (answers) =>
  apiClient.post("/quiz/submit", { answers }).then((r) => r.data);
export const sendChat = (message, session_id) =>
  apiClient.post("/chat", { message, session_id }).then((r) => r.data);