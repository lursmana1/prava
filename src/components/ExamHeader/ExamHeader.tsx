import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

type ExamHeaderProps = {
  timeLabel: ReactNode;
  currentQuestion: number;
  totalQuestions: number;
  correct: number;
  mistakes: number;
  questionId: string | number;
};

const cellBase =
  "flex-1 min-w-0 flex items-center justify-center px-2 sm:px-4 py-1.5 sm:py-2 border border-slate-600/80 bg-slate-900/60 text-xs sm:text-sm font-semibold truncate";

const ExamHeader = ({
  timeLabel,
  currentQuestion,
  totalQuestions,
  correct,
  mistakes,
  questionId,
}: ExamHeaderProps) => {
  return (
    <div className="w-full min-w-0 flex justify-center mb-3 sm:mb-4">
      <div className="flex w-full min-w-0 rounded-lg sm:rounded-xl border border-slate-600/70 bg-slate-900/80 overflow-hidden">
        <div className={cellBase}>{timeLabel}</div>

        <div className={cellBase}>
          <span className="text-yellow-300">
            {currentQuestion}/{totalQuestions}
          </span>
        </div>

        <div className={cellBase}>
          <span className="text-emerald-400">{correct}</span>
        </div>

        <div className={cellBase}>
          <span className="text-red-400">{mistakes}</span>
        </div>

        <div className={cellBase}>
          <span className="text-yellow-300">#{questionId}</span>
        </div>
        <Link href={"/"} className={cellBase}>
          prv.ge
        </Link>
      </div>
    </div>
  );
};

export default ExamHeader;
