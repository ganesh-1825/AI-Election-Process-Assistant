import { useEffect, useState } from "react";
import { fetchGuide } from "../lib/api";
import {
  UserCheck,
  ClipboardList,
  Contact,
  MapPin,
  Vote,
  BarChart3,
  Loader2,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";

const ICON_MAP = {
  UserCheck,
  ClipboardList,
  Contact,
  MapPin,
  Vote,
  BarChart3,
};

const EVM_IMG =
  "https://static.prod-images.emergentagent.com/jobs/63a34850-6f7b-4f6a-9a18-6817ac970910/images/838a7f1297bfaf334698c2c00f2d24ed29b600f8c5064fd11455b14c6e0b9ffe.png";

export default function GuidePage() {
  const [steps, setSteps] = useState([]);
  const [idx, setIdx] = useState(0);
  const [completed, setCompleted] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuide()
      .then((d) => setSteps(d.steps))
      .catch(() => toast.error("Failed to load voting guide"))
      .finally(() => setLoading(false));
  }, []);

  const current = steps[idx];
  const progress = steps.length ? ((idx + 1) / steps.length) * 100 : 0;

  const markDone = () => {
    if (!current) return;
    setCompleted((c) => ({ ...c, [current.step]: true }));
    if (idx < steps.length - 1) setIdx(idx + 1);
    else toast.success("You've completed the voting guide! 🎉");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-testid="guide-page">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">
          How to vote
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-display font-black tracking-tight text-slate-900">
          A six-step walkthrough for first-time voters.
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Follow each step at your own pace. Tick them off as you go.
        </p>
      </div>

      {loading ? (
        <div className="mt-16 grid place-items-center text-slate-500" data-testid="guide-loading">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <div className="mt-12 grid lg:grid-cols-12 gap-10">
          {/* Steps list */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <div className="px-2 mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Progress
                </span>
                <span className="text-xs font-semibold text-slate-700" data-testid="guide-progress-label">
                  {idx + 1} / {steps.length}
                </span>
              </div>
              <div className="px-2 mb-4">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-600 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                    data-testid="guide-progress-bar"
                  />
                </div>
              </div>

              <ol className="space-y-1">
                {steps.map((s, i) => {
                  const Icon = ICON_MAP[s.icon] ?? Vote;
                  const isActive = i === idx;
                  const isDone = completed[s.step];
                  return (
                    <li key={s.step}>
                      <button
                        onClick={() => setIdx(i)}
                        data-testid={`guide-step-${s.step}`}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-900"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`w-9 h-9 rounded-lg grid place-items-center shrink-0 ${
                            isDone
                              ? "bg-green-600 text-white"
                              : isActive
                                ? "bg-blue-900 text-white"
                                : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <Icon className="w-5 h-5" />
                          )}
                        </span>
                        <span className="flex-1">
                          <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                            Step {s.step}
                          </span>
                          <span className="block text-sm font-medium leading-tight">
                            {s.title}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Step detail */}
          <div className="lg:col-span-8">
            {current && (
              <div
                key={current.step}
                className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-10 shadow-sm animate-fade-up"
                data-testid="guide-detail"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">
                      Step {current.step} of {steps.length}
                    </p>
                    <h2 className="mt-2 text-3xl font-display font-bold text-slate-900 tracking-tight">
                      {current.title}
                    </h2>
                    <p className="mt-3 text-slate-600 text-lg">
                      {current.summary}
                    </p>
                  </div>
                  {current.step === 5 && (
                    <img
                      src={EVM_IMG}
                      alt="EVM"
                      className="hidden md:block w-28 h-28 rounded-2xl object-cover border border-slate-200"
                      data-testid="guide-evm-image"
                    />
                  )}
                </div>

                <div className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 mb-3">
                    What to do
                  </p>
                  <ul className="space-y-3">
                    {current.details.map((d, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-slate-700"
                        data-testid={`guide-detail-${i}`}
                      >
                        <span className="mt-1 w-5 h-5 rounded-full bg-blue-900 text-white grid place-items-center shrink-0 text-[10px] font-bold">
                          {i + 1}
                        </span>
                        <span className="text-sm leading-relaxed">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={() => setIdx(Math.max(0, idx - 1))}
                    disabled={idx === 0}
                    data-testid="guide-prev"
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={markDone}
                    data-testid="guide-next"
                    className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white rounded-full px-6 py-3 text-sm font-medium transition-colors"
                  >
                    {idx === steps.length - 1 ? "Finish" : "Mark done & next"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}