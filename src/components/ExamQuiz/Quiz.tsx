"use client";
import { useCallback, useMemo, useState } from "react";
import type { ExamQuestion } from "@/lib/types/exam";
import Image from "next/image";
import QuizButton from "../QuizButton/QuizButton";
import ExamHeader from "../ExamHeader/ExamHeader";
import ExamRetryModal from "../Modals/ExamRetryModal.tsx/ExamRetryModal";
import ExamFooter from "../ExamFooter/ExamFooter";
import ExamSuccessModal from "../Modals/ExamSucessModal/ExamSucessModal";
import ExamCountDown from "../ExamCountDown/ExamCountDown";
import {
  EXAM_TOTAL_QUESTIONS,
  MAX_MISTAKES,
  PASS_SCORE,
  EXAM_DURATION_SECONDS,
} from "@/CONSTS/QuizExamConstats";
import { getAnswers } from "@/utills/helpers/getAnswers";
import useArrowNavigation from "@/utills/helpers/hooks/useArrowNavigation";
import useAnswerKeyboard from "@/utills/helpers/hooks/useAnswerKeyboard";
import { useExamProgress } from "@/utills/helpers/hooks/useExamProgress";
import { useQuestionNavigation } from "@/utills/helpers/hooks/useQuizNavigation";

export default function ExamQuiz({ questions }: { questions: ExamQuestion[] }) {
  const safeQuestions = useMemo(
    () => (Array.isArray(questions) ? questions : []),
    [questions],
  );

  const [isTimeUp, setIsTimeUp] = useState(false);
  const [timerRestartKey, setTimerRestartKey] = useState(0);

  const [answersById, setAnswersById] = useState<Record<string, string>>({});

  const { score, mistake, totalAnswered } = useExamProgress(
    safeQuestions,
    answersById,
  );

  const examFinished = totalAnswered >= EXAM_TOTAL_QUESTIONS || isTimeUp;
  const examFailed = mistake > MAX_MISTAKES;
  const examSuccess = score >= PASS_SCORE;

  const nav = useQuestionNavigation(
    safeQuestions.length,
    examFinished || examFailed,
  );

  useArrowNavigation(nav.prev, nav.next);

  const q = safeQuestions[nav.index];
  const qId = q ? String(q.id) : "";
  const selectedAnswer = answersById[qId] ?? null;
  const answers = q ? getAnswers(q) : [];

  const handleRestart = useCallback(() => {
    nav.reset();
    setAnswersById({});
    setIsTimeUp(false);
    setTimerRestartKey((k) => k + 1);
  }, [nav.reset]);

  const handleSelect = useCallback(
    (key: string) => {
      if (examFinished || examFailed) return;
      setAnswersById((prev) => {
        if (prev[qId]) return prev;
        return { ...prev, [qId]: key };
      });
    },
    [qId, examFinished, examFailed],
  );

  useAnswerKeyboard(examFinished || examFailed || !!selectedAnswer, answers, handleSelect);

  if (!safeQuestions.length || !q) return null;

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden bg-[#193e4a]">
      <div
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-3 sm:p-4"
        style={{
          backgroundImage: "url('/png/download.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <ExamHeader
          timeLabel={
            <ExamCountDown
              initialSeconds={EXAM_DURATION_SECONDS}
              paused={examFinished || examFailed}
              restartKey={timerRestartKey}
              onTimeUp={() => setIsTimeUp(true)}
            />
          }
          currentQuestion={nav.index + 1}
          totalQuestions={EXAM_TOTAL_QUESTIONS}
          correct={score}
          mistakes={mistake}
          questionId={q.id}
        />

        <div
          key={qId}
          className={
            nav.direction === "next"
              ? "animate-slide-in-next"
              : "animate-slide-in-prev"
          }
        >
          {!!q.hasImg && (
            <div className="w-full min-w-0 mb-3">
              <Image
                src={"/" + q.img}
                alt={q.question || ""}
                className="m-auto h-auto w-full max-h-44 sm:max-h-72 lg:max-h-[280px] object-contain"
                width={1000}
                height={410}
                priority
              />
            </div>
          )}

          <p className="font-georgian p-3 sm:p-4 text-white text-sm border border-white bg-black/50 rounded-md mb-3 sm:mb-4 wrap-break-word min-w-0">
            {q.question}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 min-w-0">
            {answers.map((a) => (
              <QuizButton
                key={a.key}
                selectAnswer={handleSelect}
                answerKey={a.key}
                answerText={a.text as string}
                selectedAnswer={selectedAnswer || ""}
                correctAnswer={q.correct_answer}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="shrink-0">
        <ExamFooter
          questions={answers}
          showPrevious={nav.prev}
          showNext={nav.next}
          selectAnswer={handleSelect}
          selectedAnswer={selectedAnswer || undefined}
        />
      </div>

      {examFailed && (
        <ExamRetryModal handleRestart={handleRestart} mistake={mistake} />
      )}

      {examSuccess && examFinished && (
        <ExamSuccessModal handleRestart={handleRestart} mistake={mistake} />
      )}
    </div>
  );
}
