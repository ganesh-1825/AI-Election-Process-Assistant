import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarClock,
  ClipboardList,
  Brain,
  Sparkles,
  ShieldCheck,
  Vote,
  BookOpen,
} from "lucide-react";

const HERO_IMG =
  "https://static.prod-images.emergentagent.com/jobs/63a34850-6f7b-4f6a-9a18-6817ac970910/images/cfbc4f97de2650855ff0e196105078ef8b695098e6d6fcf774cdbe2fe5578524.png";
const TOPO_IMG =
  "https://static.prod-images.emergentagent.com/jobs/63a34850-6f7b-4f6a-9a18-6817ac970910/images/a9716123d650b46a8cca7cf210ea192cc564dfe88f12ed5be12d5964314abbd7.png";

const FEATURES = [
  {
    to: "/timeline",
    title: "Election Timeline",
    desc: "Walk through every phase — from announcement to counting day.",
    icon: CalendarClock,
    accent: "bg-blue-900 text-white",
    testid: "feature-timeline",
  },
  {
    to: "/guide",
    title: "Voting Guide",
    desc: "Six clear steps from registering to casting your vote on EVM.",
    icon: ClipboardList,
    accent: "bg-orange-600 text-white",
    testid: "feature-guide",
  },
  {
    to: "/quiz",
    title: "Civic Quiz",
    desc: "Test your knowledge — 8 questions, instant explanations.",
    icon: Brain,
    accent: "bg-green-600 text-white",
    testid: "feature-quiz",
  },
  {
    to: "/faq",
    title: "Election FAQ",
    desc: "20 common questions answered — from eligibility to results.",
    icon: BookOpen,
    accent: "bg-purple-700 text-white",
    testid: "feature-faq",
  },
];

export default function Home() {
  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        data-testid="hero-section"
      >
        <div
          className="absolute inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage: `url(${TOPO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/60 via-white/80 to-white" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 animate-fade-up">
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                AI-powered · India
              </div>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.05] text-slate-900">
                Understand Indian{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-blue-900">elections</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-orange-200/80 -z-0 rounded-sm" />
                </span>
                ,
                <br />
                step by step.
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                CivicAI is your friendly, non-political guide to voting in
                India. Ask the AI assistant, explore the election timeline,
                follow the voting walkthrough, and test yourself with a quick
                quiz.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/guide"
                  data-testid="hero-cta-guide"
                  className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white rounded-full px-6 py-3 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
                >
                  Start the voting guide <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/timeline"
                  data-testid="hero-cta-timeline"
                  className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-full px-6 py-3 font-medium transition-colors"
                >
                  See timeline
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  Non-partisan
                </div>
                <div className="flex items-center gap-2">
                  <Vote className="w-4 h-4 text-blue-900" />
                  ECI-aligned info
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 animate-fade-up delay-2">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-tr from-blue-100 via-orange-50 to-green-100 rounded-[2rem] blur-2xl opacity-60" />
                <img
                  src={HERO_IMG}
                  alt="Interactive ballot box illustration"
                  className="relative w-full rounded-3xl shadow-xl border border-white"
                  data-testid="hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES BENTO */}
      <section className="bg-white border-t border-slate-200" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
              What's inside
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Everything a first-time voter needs.
            </h2>
            <p className="mt-3 text-slate-600">
              Three short modules that make sense of the most populous democracy
              on Earth.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <Link
                key={f.to}
                to={f.to}
                data-testid={f.testid}
                className={`group relative bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fade-up delay-${i + 1}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${f.accent} grid place-items-center shadow-sm`}
                >
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-xl font-display font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                  {f.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-900 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CALLOUT */}
      <section className="bg-slate-50 border-t border-slate-200" data-testid="callout-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-blue-900 text-white rounded-3xl p-10 lg:p-14 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-orange-500/30 blur-3xl" />
            <div className="absolute -left-10 -bottom-10 w-64 h-64 rounded-full bg-green-500/20 blur-3xl" />
            <div className="relative max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-300">
                AI Assistant
              </p>
              <h3 className="mt-3 text-3xl sm:text-4xl font-display font-bold tracking-tight">
                Got a question? Just ask.
              </h3>
              <p className="mt-4 text-blue-100/90">
                Tap the chat button at the bottom right and ask CivicAI anything
                about Indian elections — in plain English.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}