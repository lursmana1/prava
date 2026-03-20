"use client";

type WeakQuestion = {
  questionId: number;
  wrongCount: number;
  question: unknown;
};

type WeakQuestionsChartProps = {
  data: WeakQuestion[];
  maxWrongCount?: number;
  title: string;
  questionLabel: string;
  wrongLabel: string;
};

export function WeakQuestionsChart({
  data,
  maxWrongCount,
  title,
  questionLabel,
  wrongLabel,
}: WeakQuestionsChartProps) {
  const maxCount =
    maxWrongCount ?? Math.max(...data.map((d) => d.wrongCount), 1);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">{title}</h2>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.questionId} className="group">
            <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
              <span className="truncate font-medium text-slate-700">
                {questionLabel} #{item.questionId}
              </span>
              <span className="shrink-0 rounded bg-rose-100 px-2 py-0.5 font-medium text-rose-700">
                {item.wrongCount} {wrongLabel}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-500 transition-all duration-500"
                style={{ width: `${(item.wrongCount / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
