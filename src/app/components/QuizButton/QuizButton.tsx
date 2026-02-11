import { ReactNode } from "react";

type QuizButtonProps = {
  selectAnswer: (value: string) => void;
  answerKey: string;
  answerText: string;
  selectedAnswer: string;
  correctAnswer: string;
  children: ReactNode;
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

  const isDisabled = hasSelected;
  const base =
    "w-full text-left flex items-center p-2 rounded border transition-colors h-20";

  const stateClass = hasSelected
    ? isThisCorrect
      ? "bg-green-100 border-green-500"
      : isThisSelected
        ? "bg-red-100 border-red-500"
        : "border-gray-300"
    : "border-gray-300 hover:border-blue-300 cursor-pointer";

  const cursorClass = hasSelected ? "cursor-default" : "";

  return (
    <button
      type="button"
      onClick={() => selectAnswer(answerKey)}
      disabled={isDisabled}
      className={`${base} ${stateClass} ${cursorClass}`}
    >
      {answerText}
    </button>
  );
};
export default QuizButton;
