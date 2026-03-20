"use client";

import { useLocale, useTranslations } from "next-intl";
import { getAiTutorText, type ExamQuestion } from "@/lib/types/exam";
import Image from "next/image";
import QuizButton from "../QuizButton/QuizButton";
import ExamFooter from "../ExamFooter/ExamFooter";
import QuestionExplanation from "../QuestionExplanation/QuestionExplanation";
import { getAnswers } from "@/utills/helpers/getAnswers";
import { AiTutorReadButton } from "./AiTutorReadButton";

type TicketQuizProps = {
  question: ExamQuestion;
  questionIndex?: number;
  selectedAnswer: string | null;
  onSelect: (questionId: string, key: string) => void;
};

export default function TicketQuiz({
  question,
  questionIndex,
  selectedAnswer,
  onSelect,
}: TicketQuizProps) {
  const t = useTranslations("Tickets");
  const locale = useLocale();
  const answers = getAnswers(question);
  const qId = String(question.id);
  const aiTutorText = getAiTutorText(question);

  const handleSelect = (key: string) => {
    onSelect(qId, key);
  };

  return (
    <>
      <div className="relative p-4 h-auto bg-[#193e4a] bg-[url('/png/download.png')] bg-no-repeat bg-center bg-contain scroll-mt-4">
        <QuestionExplanation
          questionId={question.id}
          questionIndex={questionIndex}
          explanation={question.question_explained}
        />

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

          {aiTutorText !== "" && (
            <div className="mb-4 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <AiTutorReadButton id={qId} text={aiTutorText} lang={locale} />
              </div>
              <details className="rounded-md border border-white/30 bg-black/30 p-3 text-white/90">
                <summary className="cursor-pointer text-sm font-medium">
                  {t("aiTutorShowText")}
                </summary>
                <p className="mt-2 font-georgian text-sm leading-relaxed">
                  {aiTutorText}
                </p>
              </details>
            </div>
          )}

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

      <ExamFooter
        questions={answers}
        selectAnswer={handleSelect}
        selectedAnswer={selectedAnswer || undefined}
      />
    </>
  );
}
