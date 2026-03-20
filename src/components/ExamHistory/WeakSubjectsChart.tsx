"use client";

type WeakSubject = {
  subjectId: number;
  wrongCount: number;
  correctCount: number;
  totalQuestions: number;
};

type SubjectInfo = {
  id: number;
  name: string;
};

type WeakSubjectsChartProps = {
  data: WeakSubject[];
  subjects: SubjectInfo[];
  title: string;
  wrongLabel: string;
  correctLabel: string;
  totalLabel?: string;
};

export function WeakSubjectsChart({
  data,
  subjects,
  title,
  wrongLabel,
  correctLabel,
  totalLabel = "total",
}: WeakSubjectsChartProps) {
  const getSubjectName = (id: number) =>
    subjects.find((s) => s.id === id)?.name ?? `#${id}`;

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">{title}</h2>
      <div className="space-y-4">
        {data.map((item) => {
          const total = item.wrongCount + item.correctCount;
          const wrongPercent = total > 0 ? (item.wrongCount / total) * 100 : 0;
          const correctPercent =
            total > 0 ? (item.correctCount / total) * 100 : 0;

          return (
            <div key={item.subjectId} className="group">
              <div className="mb-1.5 flex items-baseline justify-between gap-2">
                <span
                  className="truncate text-sm font-medium text-slate-700"
                  title={getSubjectName(item.subjectId)}
                >
                  {getSubjectName(item.subjectId)}
                </span>
                <span className="flex shrink-0 gap-2 text-xs">
                  <span className="rounded bg-rose-100 px-2 py-0.5 font-medium text-rose-700">
                    {item.wrongCount} {wrongLabel}
                  </span>
                  <span className="rounded bg-emerald-100 px-2 py-0.5 font-medium text-emerald-700">
                    {item.correctCount} {correctLabel}
                  </span>
                </span>
              </div>
              <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="bg-gradient-to-r from-rose-400 to-rose-500 transition-all duration-500"
                  style={{ width: `${wrongPercent}%` }}
                />
                <div
                  className="bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500"
                  style={{ width: `${correctPercent}%` }}
                />
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {item.totalQuestions} {totalLabel}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
