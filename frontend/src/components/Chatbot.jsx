import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { sendChat } from "../lib/api";
import { toast } from "sonner";

const SUGGESTIONS = [
  "Who is eligible to vote in India?",
  "How do I register to vote?",
  "What is VVPAT?",
  "What is NOTA?",
  "What documents are required for voter registration?",
  "What happens on voting day?",
  "Is voting compulsory in India?",
  "How do I find my polling station?",
];

const SESSION_KEY = "civicai_session_id";

export const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const sid = localStorage.getItem(SESSION_KEY);
    if (sid) setSessionId(sid);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (raw) => {
    const text = (raw ?? input).trim();
    if (!text || loading) return;

    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendChat(text, sessionId);
      if (!sessionId) {
        setSessionId(res.session_id);
        localStorage.setItem(SESSION_KEY, res.session_id);
      }
      setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
    } catch (e) {
      console.error(e);
      toast.error("Couldn't reach the assistant. Please try again.");
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I'm having trouble responding right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-blue-900 hover:bg-blue-800 text-white shadow-[0_8px_28px_rgba(30,58,138,0.35)] grid place-items-center transition-transform hover:scale-105 ${
          open ? "" : "pulse-ring"
        }`}
        data-testid="chatbot-toggle"
        aria-label={open ? "Close assistant" : "Open assistant"}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-[400px] h-[560px] max-h-[80vh] bg-white rounded-2xl shadow-[0_16px_48px_rgba(15,23,42,0.18)] border border-slate-200 flex flex-col overflow-hidden animate-fade-up"
          data-testid="chatbot-panel"
        >
          <div className="bg-blue-900 text-white px-5 py-4 flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-white/15 grid place-items-center">
              <Sparkles className="w-5 h-5" />
            </span>
            <div className="flex-1">
              <p className="font-display font-semibold leading-tight">
                Ask CivicAI
              </p>
              <p className="text-xs text-blue-100/90">
                Non-partisan election guide
              </p>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50"
            data-testid="chatbot-messages"
          >
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 text-sm text-slate-700 animate-fade-up">
                  <p className="font-medium text-slate-900 mb-1">
                    Namaste! I'm CivicAI 🇮🇳
                  </p>
                  <p>
                    Ask me anything about Indian elections — eligibility,
                    registration, voter ID, EVMs, or what happens on poll day.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    Try asking
                  </p>
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      data-testid={`chatbot-suggestion-${i}`}
                      className="w-full text-left text-sm bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-colors rounded-xl px-3 py-2 text-slate-700"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap animate-fade-up ${
                    m.role === "user"
                      ? "bg-blue-900 text-white rounded-br-sm"
                      : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm"
                  }`}
                  data-testid={`chatbot-msg-${i}`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 flex items-center gap-2 text-slate-500 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about elections..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              data-testid="chatbot-input"
              className="flex-1 rounded-full bg-slate-100 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/40 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              data-testid="chatbot-send"
              className="w-10 h-10 rounded-full bg-blue-900 hover:bg-blue-800 text-white grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;