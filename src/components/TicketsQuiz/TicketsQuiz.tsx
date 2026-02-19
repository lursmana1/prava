import type { ExamQuestion } from "@/lib/types/exam";
import Image from "next/image";
import QuizButton from "../QuizButton/QuizButton";
import ExamFooter from "../ExamFooter/ExamFooter";
import { getAnswers } from "@/utills/helpers/getAnswers";

type TicketQuizProps = {
  question: ExamQuestion;
  selectedAnswer: string | null;
  onSelect: (questionId: string, key: string) => void;
};

export default function TicketQuiz({
  question,
  selectedAnswer,
  onSelect,
}: TicketQuizProps) {
  const answers = getAnswers(question);
  const qId = String(question.id);

  const handleSelect = (key: string) => {
    onSelect(qId, key);
  };

  return (
    <>
      <div className="p-4 h-auto bg-[#193e4a] bg-[url('/png/download.png')] bg-no-repeat bg-center bg-contain">
        <div>
          {!!question.hasImg && (
            <Image
              src={"/" + question.img}
              alt={question.question || ""}
              className="m-auto h-auto max-h-110"
              width={1000}
              height={410}
              priority
            />
          )}

          <p className="font-georgian p-4 text-white text-sm border border-white bg-black/50 rounded-md mb-4">
            {question.question}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 auto-rows-fr items-stretch">
            {answers.map((a) => (
              <QuizButton
                key={a.key}
                selectAnswer={handleSelect}
                answerKey={a.key}
                answerText={a.text as string}
                selectedAnswer={selectedAnswer || ""}
                correctAnswer={question.correct_answer}
              />
            ))}
          </div>
        </div>
      </div>

      <ExamFooter questions={answers} selectAnswer={handleSelect} selectedAnswer={selectedAnswer || undefined} />
    </>
  );
}
