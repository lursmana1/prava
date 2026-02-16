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
import { useExamProgress } from "@/utills/helpers/hooks/useExamProgress";
import { useQuestionNavigation } from "@/utills/helpers/hooks/useQuizNavigation";

export default function ExamQuiz({ questions }: { questions: ExamQuestion[] }) {
  const safeQuestions = Array.isArray(questions) ? questions : [];
  if (!safeQuestions.length) return null;

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
  if (!q) return null;

  const qId = String(q.id);
  const selectedAnswer = answersById[qId] ?? null;

  const answers = getAnswers(q);

  const handleRestart = useCallback(() => {
    nav.reset();
    setAnswersById({});
    setIsTimeUp(false);
    setTimerRestartKey((k) => k + 1);
  }, [nav.reset]);

  const handleSelect = useCallback(
    (key: string) => {
      if (examFinished || examFailed) return;
      if (answersById[qId]) return;
      setAnswersById((prev) => ({ ...prev, [qId]: key }));
    },
    [answersById, qId, examFinished, examFailed],
  );

  return (
    <>
      <div
        className="p-4 h-[90vh] overflow-auto overflow-x-hidden exam-scroll"
        style={{
          backgroundImage: "url('/png/download.png')",
          backgroundColor: "#193e4a",
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
            <Image
              src={"/" + q.img}
              alt={q.question || ""}
              className="m-auto h-auto max-h-110"
              width={1000}
              height={410}
              priority
            />
          )}

          <p className="font-georgian p-4 text-white text-sm border border-white bg-black/50 rounded-md mb-4">
            {q.question}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 auto-rows-fr items-stretch">
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

      <ExamFooter
        questions={answers}
        showPrevious={nav.prev}
        showNext={nav.next}
        selectAnswer={handleSelect}
      />

      {examFailed && (
        <ExamRetryModal handleRestart={handleRestart} mistake={mistake} />
      )}

      {examSuccess && examFinished && (
        <ExamSuccessModal handleRestart={handleRestart} mistake={mistake} />
      )}
    </>
  );
}
