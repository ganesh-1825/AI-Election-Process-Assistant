import { useEffect, useState } from "react";
import { fetchTimeline } from "../lib/api";
import {
  Megaphone,
  FileSignature,
  Speaker,
  Vote,
  BarChart3,
  Loader2,
  Check,
} from "lucide-react";
import { toast } from "sonner";

const ICON_MAP = { Megaphone, FileSignature, Speaker, Vote, BarChart3 };

const COLOR_MAP = {
  blue: { dot: "bg-blue-900", chip: "bg-blue-100 text-blue-900", ring: "ring-blue-200" },
  indigo: {
    dot: "bg-indigo-700",
    chip: "bg-indigo-100 text-indigo-800",
    ring: "ring-indigo-200",
  },
  orange: {
    dot: "bg-orange-600",
    chip: "bg-orange-100 text-orange-800",
    ring: "ring-orange-200",
  },
  green: {
    dot: "bg-green-600",
    chip: "bg-green-100 text-green-800",
    ring: "ring-green-200",
  },
  purple: {
    dot: "bg-purple-700",
    chip: "bg-purple-100 text-purple-800",
    ring: "ring-purple-200",
  },
};

export default function TimelinePage() {
  const [stages, setStages] = useState([]);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimeline()
      .then((d) => {
        setStages(d.stages);
        if (d.stages?.length) setActive(d.stages[0]);
      })
      .catch(() => toast.error("Failed to load timeline"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-testid="timeline-page">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
          Election timeline
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-display font-black tracking-tight text-slate-900">
          From announcement to results.
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Tap any stage to learn what happens, who is involved, and what citizens
          should know.
        </p>
      </div>

      {loading ? (
        <div className="mt-16 grid place-items-center text-slate-500" data-testid="timeline-loading">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <div className="mt-12 grid lg:grid-cols-12 gap-10">
          {/* Stages */}
          <div className="lg:col-span-5">
            <ol
              className="relative border-l-2 border-dashed border-slate-200 ml-3 space-y-4"
              data-testid="timeline-list"
            >
              {stages.map((s) => {
                const Icon = ICON_MAP[s.icon] ?? Vote;
                const color = COLOR_MAP[s.color] ?? COLOR_MAP.blue;
                const isActive = active?.id === s.id;
                return (
                  <li key={s.id} className="ml-6">
                    <span
                      className={`absolute -left-[11px] flex items-center justify-center w-5 h-5 rounded-full ${color.dot} ring-4 ${color.ring} ring-opacity-60`}
                    />
                    <button
                      onClick={() => setActive(s)}
                      data-testid={`timeline-stage-${s.id}`}
                      className={`group w-full text-left rounded-2xl p-5 border transition-all ${
                        isActive
                          ? "bg-white border-slate-300 shadow-md -translate-y-0.5"
                          : "bg-white/60 border-slate-200 hover:bg-white hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`w-10 h-10 rounded-xl ${color.dot} text-white grid place-items-center shrink-0`}
                        >
                          <Icon className="w-5 h-5" />
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-display font-semibold text-slate-900">
                              {s.stage}
                            </h3>
                            <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${color.chip}`}>
                              {s.duration}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-600">
                            {s.short}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Detail */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 self-start">
            {active && (
              <div
                key={active.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 lg:p-10 animate-fade-up"
                data-testid="timeline-detail"
              >
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                  Stage · {active.duration}
                </p>
                <h2 className="mt-2 text-3xl font-display font-bold text-slate-900 tracking-tight">
                  {active.stage}
                </h2>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  {active.description}
                </p>

                <div className="mt-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 mb-3">
                    Key points
                  </p>
                  <ul className="space-y-3">
                    {active.key_points.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-slate-700"
                        data-testid={`timeline-keypoint-${i}`}
                      >
                        <span className="mt-1 w-5 h-5 rounded-full bg-green-100 text-green-700 grid place-items-center shrink-0">
                          <span className="sr-only">Check</span>
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-sm leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}