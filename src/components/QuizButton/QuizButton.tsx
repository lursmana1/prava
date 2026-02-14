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
    "w-full h-full text-left font-georgian text-white flex items-start rounded border transition-colors p-3 leading-snug break-words";

  const stateClass = hasSelected
    ? isThisCorrect
      ? "bg-[#05c300c9] border-[#c3e6cb;] text-black"
      : isThisSelected
        ? "bg-[#ff3346a8] border-[#f5c6cb] text-black"
        : "border-gray-300 opacity-70"
    : "border-gray-300 hover:border-blue-300 cursor-pointer";

  return (
    <button
      type="button"
      onClick={() => selectAnswer(answerKey)}
      disabled={hasSelected}
      className={`${base} ${stateClass}`}
    >
      {answerText}
    </button>
  );
};

export default QuizButton;
