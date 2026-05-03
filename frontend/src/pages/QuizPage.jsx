import { useEffect, useState } from "react";
import { fetchQuiz, submitQuiz } from "../lib/api";
import { Loader2, Brain, RotateCw, Check, X, Trophy } from "lucide-react";
import { toast } from "sonner";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = () => {
    setLoading(true);
    setResult(null);
    setAnswers({});
    fetchQuiz()
      .then((d) => setQuestions(d.questions))
      .catch(() => toast.error("Failed to load quiz"))
      .finally(() => setLoading(false));
  };

  const setAnswer = (qid, idx) =>
    setAnswers((a) => ({ ...a, [qid]: idx }));

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const onSubmit = async () => {
    if (!allAnswered) {
      toast.warning("Please answer every question first.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await submitQuiz(answers);
      setResult(res);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      toast.error("Couldn't submit quiz. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 grid place-items-center text-slate-500" data-testid="quiz-loading">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-testid="quiz-page">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-700">
          Knowledge check
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-display font-black tracking-tight text-slate-900">
          How well do you know Indian elections?
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Eight quick multiple-choice questions. You'll see explanations after
          submitting.
        </p>
      </div>

      {result ? (
        <div className="mt-10 space-y-6" data-testid="quiz-result">
          <div className="bg-blue-900 text-white rounded-3xl p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-orange-500/30 blur-3xl" />
            <div className="relative flex items-center gap-5">
              <span className="w-16 h-16 rounded-2xl bg-white/15 grid place-items-center">
                <Trophy className="w-8 h-8" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-200">
                  Your score
                </p>
                <p className="mt-1 text-4xl font-display font-black" data-testid="quiz-score">
                  {result.score} / {result.total}{" "}
                  <span className="text-lg font-medium text-blue-100">
                    ({result.percentage}%)
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {result.breakdown.map((b, i) => (
              <div
                key={b.id}
                className={`bg-white rounded-2xl border p-6 ${
                  b.is_correct ? "border-green-200" : "border-red-200"
                }`}
                data-testid={`quiz-breakdown-${i}`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-8 h-8 rounded-full grid place-items-center shrink-0 ${
                      b.is_correct
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.is_correct ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{b.question}</p>
                    <p className="mt-2 text-sm text-slate-600">
                      <span className="font-semibold text-slate-700">
                        Correct answer:{" "}
                      </span>
                      {b.correct_answer}
                    </p>
                    <p className="mt-2 text-sm text-slate-500 italic">
                      {b.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={loadQuiz}
              data-testid="quiz-retry"
              className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white rounded-full px-6 py-3 font-medium transition-colors"
            >
              <RotateCw className="w-4 h-4" /> Try again
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-10 space-y-5" data-testid="quiz-questions">
          {questions.map((q, qi) => (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-7 shadow-sm"
              data-testid={`quiz-q-${q.id}`}
            >
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-green-50 text-green-700 grid place-items-center shrink-0">
                  <Brain className="w-4 h-4" />
                </span>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    Question {qi + 1}
                  </p>
                  <h3 className="mt-1 font-display font-semibold text-lg text-slate-900">
                    {q.question}
                  </h3>
                </div>
              </div>

              <div className="mt-5 grid sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, i) => {
                  const selected = answers[q.id] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setAnswer(q.id, i)}
                      data-testid={`quiz-${q.id}-opt-${i}`}
                      className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                        selected
                          ? "border-blue-900 bg-blue-50 text-blue-900 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="inline-block w-6 h-6 rounded-md bg-white border border-slate-200 text-xs font-bold mr-3 leading-6 text-center">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="pt-4 flex items-center justify-between">
            <p className="text-sm text-slate-500" data-testid="quiz-status">
              {Object.keys(answers).length} of {questions.length} answered
            </p>
            <button
              onClick={onSubmit}
              disabled={submitting}
              data-testid="quiz-submit"
              className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 disabled:opacity-60 text-white rounded-full px-7 py-3 font-medium transition-colors"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : (
                "Submit quiz"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}