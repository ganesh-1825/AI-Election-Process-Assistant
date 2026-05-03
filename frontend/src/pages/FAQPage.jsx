import { useEffect, useState } from "react";
import { fetchFaq } from "../lib/api";
import {
  HelpCircle,
  ChevronDown,
  Search,
  BookOpen,
  Loader2,
  AlertCircle,
} from "lucide-react";

/* ── Keyword → colour chip map ────────────────────────────────────── */
const CATEGORY_MAP = [
  { label: "Eligibility", keywords: ["eligible", "eligibility", "citizen", "age"], color: "bg-blue-100 text-blue-800" },
  { label: "Registration", keywords: ["register", "registration", "form 6", "nvsp", "enrol"], color: "bg-indigo-100 text-indigo-800" },
  { label: "Voter ID", keywords: ["voter id", "epic", "card"], color: "bg-purple-100 text-purple-800" },
  { label: "Voting Day", keywords: ["voting day", "polling", "evm", "cast", "booth", "ink", "vvpat"], color: "bg-green-100 text-green-800" },
  { label: "Results", keywords: ["result", "count", "declar"], color: "bg-orange-100 text-orange-800" },
  { label: "NOTA", keywords: ["nota", "none of the above"], color: "bg-rose-100 text-rose-800" },
  { label: "Timeline", keywords: ["stage", "phase", "timeline", "announce", "nominat", "campaign"], color: "bg-amber-100 text-amber-800" },
];

function getCategory(q) {
  const text = (q.question + " " + q.answer).toLowerCase();
  for (const cat of CATEGORY_MAP) {
    if (cat.keywords.some((kw) => text.includes(kw))) return cat;
  }
  return { label: "General", color: "bg-slate-100 text-slate-600" };
}

/* ── Single accordion item ─────────────────────────────────────────── */
function FaqItem({ item, index, isOpen, onToggle }) {
  const cat = getCategory(item);
  return (
    <div
      className={`border border-slate-200 rounded-2xl overflow-hidden transition-shadow duration-200 ${
        isOpen ? "shadow-md ring-1 ring-blue-100" : "hover:shadow-sm"
      } animate-fade-up`}
      style={{ animationDelay: `${index * 0.04}s` }}
      data-testid={`faq-item-${index}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors"
        aria-expanded={isOpen}
        id={`faq-btn-${index}`}
      >
        {/* Number badge */}
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900 text-white text-xs font-bold grid place-items-center mt-0.5">
          {index + 1}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span
              className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${cat.color}`}
            >
              {cat.label}
            </span>
          </div>
          <p className="font-semibold text-slate-900 leading-snug pr-4">
            {item.question}
          </p>
        </div>

        <ChevronDown
          className={`flex-shrink-0 w-5 h-5 text-slate-400 transition-transform duration-300 mt-1 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-6 pt-1 bg-blue-50/40 border-t border-blue-100">
          <p className="text-slate-700 leading-relaxed text-sm">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ─────────────────────────────────────────────────────── */
export default function FAQPage() {
  const [faq, setFaq] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchFaq()
      .then((data) => {
        setFaq(data.faq || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load FAQ. Please make sure the backend is running.");
        setLoading(false);
      });
  }, []);

  const allCategories = ["All", ...CATEGORY_MAP.map((c) => c.label), "General"];

  const filtered = faq.filter((item) => {
    const matchesSearch =
      search.trim() === "" ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      activeCategory === "All" || getCategory(item).label === activeCategory;
    return matchesSearch && matchesCat;
  });

  const usedCategories = [
    "All",
    ...CATEGORY_MAP.filter((cat) =>
      faq.some((item) => getCategory(item).label === cat.label)
    ).map((c) => c.label),
  ];

  return (
    <div data-testid="faq-page" className="min-h-screen bg-slate-50">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5">
            <BookOpen className="w-3.5 h-3.5" />
            Knowledge Base
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 tracking-tight">
            Election{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-blue-900">FAQ</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-orange-200/80 -z-0 rounded-sm" />
            </span>
          </h1>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto leading-relaxed">
            {faq.length} answers to the most common questions about Indian
            elections — from eligibility to results.
          </p>

          {/* Search */}
          <div className="mt-8 relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search questions or answers…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpenIndex(null);
              }}
              data-testid="faq-search"
              className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/30 shadow-sm"
            />
          </div>

          {/* Category chips */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {usedCategories.map((cat) => {
              const catDef = CATEGORY_MAP.find((c) => c.label === cat);
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenIndex(null);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                    isActive
                      ? "bg-blue-900 text-white border-blue-900"
                      : catDef
                      ? `${catDef.color} border-transparent hover:opacity-80`
                      : "bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200"
                  }`}
                  data-testid={`faq-cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="flex flex-col items-center gap-4 py-24 text-slate-500">
            <Loader2 className="w-10 h-10 animate-spin text-blue-900" />
            <p>Loading FAQ…</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-3 py-24 text-red-600">
            <AlertCircle className="w-10 h-10" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-24 text-slate-400">
            <HelpCircle className="w-10 h-10" />
            <p className="text-sm">
              No results for <strong>"{search}"</strong>. Try a different term.
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            {search || activeCategory !== "All" ? (
              <p className="text-xs text-slate-500 mb-5 font-medium">
                Showing {filtered.length} of {faq.length} questions
              </p>
            ) : null}
            <div className="space-y-3">
              {filtered.map((item, i) => (
                <FaqItem
                  key={i}
                  item={item}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
