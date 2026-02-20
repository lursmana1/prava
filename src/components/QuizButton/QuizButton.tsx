type QuizButtonProps = {
  selectAnswer: (value: string) => void;
  answerKey: string;
  answerText: string;
  selectedAnswer: string;
  correctAnswer: string;
};

const QuizButton = ({
  selectAnswer,
  answerKey,
  answerText,
  selectedAnswer,
  correctAnswer,
}: QuizButtonProps) => {
  const hasSelected = Boolean(selectedAnswer);
  const isThisSelected = selectedAnswer === answerKey;
  const isThisCorrect = answerKey === correctAnswer;

  const base =
    "w-full min-w-0 text-left font-georgian text-white flex items-center gap-2 sm:gap-4 rounded border transition p-3 sm:p-4 leading-snug";

  const stateClass = hasSelected
    ? isThisCorrect
      ? "bg-[#05c300c9] border-[#c3e6cb] text-black"
      : isThisSelected
        ? "bg-[#ff3346a8] border-[#f5c6cb] text-black"
        : "border-gray-300 opacity-70"
    : "border-gray-300 hover:border-blue-300 cursor-pointer"; // ✅ NO background

  return (
    <button
      type="button"
      onClick={() => selectAnswer(answerKey)}
      disabled={hasSelected}
      className={`${base} ${stateClass}`}
    >
      {/* Key badge */}
      <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-gray-200 text-black font-semibold text-base sm:text-lg shrink-0">
        {answerKey}
      </div>

      {/* Text */}
      <div className="wrap-break-word min-w-0 overflow-hidden">
        {answerText}
      </div>
    </button>
  );
};

export default QuizButton;
