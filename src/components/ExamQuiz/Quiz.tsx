"use client";

import Image from "next/image";
import type { ExamQuestion } from "@/lib/types/exam";
import {
  EXAM_TOTAL_QUESTIONS,
  EXAM_DURATION_SECONDS,
  PASS_SCORE,
} from "@/CONSTS/QuizExamConstats";
import { useExamQuiz } from "@/utills/helpers/hooks/exam";

import ExamCountDown from "../ExamCountDown/ExamCountDown";
import ExamFooter from "../ExamFooter/ExamFooter";
import ExamHeader from "../ExamHeader/ExamHeader";
import ExamRetryModal from "../Modals/ExamRetryModal.tsx/ExamRetryModal";
import ExamSuccessModal from "../Modals/ExamSucessModal/ExamSucessModal";
import QuizButton from "../QuizButton/QuizButton";
import ExamAnswerButtons from "./ExamAnswerButtons";
import ExamAutoAdvanceCheckbox from "./ExamAutoAdvanceCheckbox";
import ExamQuestionContent from "./ExamQuestionContent";
import ExamRestartOverlay from "./ExamRestartOverlay";

export default function ExamQuiz({ questions }: { questions: ExamQuestion[] }) {
  const exam = useExamQuiz(questions);

  if (!exam.safeQuestions.length || !exam.q) return null;

  const {
    q,
    answers,
    selectedAnswer,
    nav,
    examFinished,
    examFailed,
    examEnded,
  } = exam;

  return (
    <div className="relative flex flex-1 flex-col min-h-0 overflow-hidden bg-[#193e4a]">
      <div className="shrink-0 p-3 sm:p-4">
        <ExamHeader
          timeLabel={
            <ExamCountDown
              initialSeconds={EXAM_DURATION_SECONDS}
              paused={examEnded}
              restartKey={exam.timerRestartKey}
              onTimeUp={() => exam.setIsTimeUp(true)}
            />
          }
          currentQuestion={nav.index + 1}
          totalQuestions={EXAM_TOTAL_QUESTIONS}
          correct={exam.score}
          mistakes={exam.mistake}
          questionId={q.id}
        />
      </div>

      <div
        className={`flex flex-1 flex-col min-h-0 overflow-hidden ${exam.isSwipeEnabled ? "select-none" : ""}`}
        style={exam.isSwipeEnabled ? { touchAction: "pan-y" } : undefined}
        {...(exam.isSwipeEnabled ? exam.swipe.handlers : {})}
      >
        <ExamQuestionContent
          question={q}
          direction={nav.direction}
          dragOffset={exam.swipe.dragOffset}
          isSwipeEnabled={false}
          swipeHandlers={{}}
        />

        <ExamAutoAdvanceCheckbox
          checked={exam.autoAdvance}
          onChange={exam.handleAutoAdvanceChange}
        />

        <ExamAnswerButtons
          answers={answers}
          selectedAnswer={selectedAnswer}
          correctAnswer={q.correct_answer}
          onSelect={exam.handleSelect}
        />
      </div>

      <div className="shrink-0">
        <ExamFooter
          questions={answers}
          correctAnswer={q.correct_answer}
          showPrevious={nav.prev}
          showNext={nav.next}
          selectAnswer={exam.handleSelect}
          selectedAnswer={selectedAnswer || undefined}
        />
      </div>

      {examFailed && (
        <ExamRetryModal
          handleRestart={exam.handleRestart}
          mistake={exam.mistake}
        />
      )}

      {examFinished && exam.score >= PASS_SCORE && (
        <ExamSuccessModal
          handleRestart={exam.handleRestart}
          mistake={exam.mistake}
        />
      )}

      {exam.isPending && <ExamRestartOverlay />}
    </div>
  );
}
