import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ExamQuestion } from "@/lib/types/exam";
import {
  EXAM_TOTAL_QUESTIONS,
  MAX_MISTAKES,
  AUTO_ADVANCE_DELAY_MS,
} from "@/CONSTS/QuizExamConstats";
import { MEDIA_BELOW_LG } from "@/CONSTS/breakpoints";
import { getAnswers } from "@/utills/helpers/getAnswers";
import useArrowNavigation from "@/utills/helpers/hooks/useArrowNavigation";
import useAnswerKeyboard from "@/utills/helpers/hooks/useAnswerKeyboard";
import { useMediaQuery } from "@/utills/helpers/hooks/useMediaQuery";
import { useSwipeable } from "@/utills/helpers/hooks/useSwipeable";
import { useExamProgress } from "@/utills/helpers/hooks/useExamProgress";
import { useQuestionNavigation } from "@/utills/helpers/hooks/useQuizNavigation";
import { useAutoAdvance } from "./useAutoAdvance";
import { useExamRestart } from "./useExamRestart";
import { submitAnswer } from "@/api/examAttempts";

export function useExamQuiz(
  questions: ExamQuestion[],
  attemptId?: number | null,
  onRestart?: () => void,
) {
  const safeQuestions = useMemo(
    () => (Array.isArray(questions) ? questions : []),
    [questions],
  );

  const [isTimeUp, setIsTimeUp] = useState(false);
  const [timerRestartKey, setTimerRestartKey] = useState(0);
  const [answersById, setAnswersById] = useState<Record<string, string>>({});

  const { autoAdvance, handleAutoAdvanceChange, timeoutRef } = useAutoAdvance();

  const { score, mistake, totalAnswered } = useExamProgress(safeQuestions, answersById);

  const examFinished = totalAnswered >= EXAM_TOTAL_QUESTIONS || isTimeUp;
  const examFailed = mistake > MAX_MISTAKES;
  const examEnded = examFinished || examFailed;

  const nav = useQuestionNavigation(safeQuestions.length, examEnded);
  const navNextRef = useRef(nav.next);
  navNextRef.current = nav.next;
  useArrowNavigation(nav.prev, nav.next);

  const q = safeQuestions[nav.index];
  const qId = q ? String(q.id) : "";
  const selectedAnswer = answersById[qId] ?? null;
  const answers = q ? getAnswers(q) : [];
  const answeringRef = useRef(false);

  useEffect(() => {
    answeringRef.current = false;
  }, [qId]);

  const onReset = useCallback(() => {
    nav.reset();
    setAnswersById({});
    setIsTimeUp(false);
    setTimerRestartKey((k) => k + 1);
  }, [nav.reset]);

  const { handleRestart } = useExamRestart({ onReset, onRestart });

  const handleSelect = useCallback(
    (key: string) => {
      if (examFinished || examFailed) return;
      if (answeringRef.current || selectedAnswer) return;
      answeringRef.current = true;

      setAnswersById((prev) => {
        if (prev[qId]) return prev;
        return { ...prev, [qId]: key };
      });

      if (attemptId && q) {
        submitAnswer(attemptId, q.id, key).catch(() => {});
      }

      if (nav.index < safeQuestions.length - 1 && autoAdvance) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          answeringRef.current = false;
          nav.next();
          timeoutRef.current = null;
        }, AUTO_ADVANCE_DELAY_MS);
      }
    },
    [qId, examFinished, examFailed, selectedAnswer, nav.index, safeQuestions.length, autoAdvance, attemptId, q],
  );

  const isSwipeEnabled = useMediaQuery(MEDIA_BELOW_LG);
  const swipe = useSwipeable({
    onSwipeLeft: nav.next,
    onSwipeRight: nav.prev,
    disabled: examEnded || !isSwipeEnabled,
  });

  useAnswerKeyboard(examEnded || !!selectedAnswer, answers, handleSelect);

  return {
    q,
    qId,
    answers,
    selectedAnswer,
    nav,
    examFinished,
    examFailed,
    examEnded,
    score,
    mistake,
    isTimeUp,
    setIsTimeUp,
    timerRestartKey,
    handleRestart,
    handleSelect,
    autoAdvance,
    handleAutoAdvanceChange,
    isSwipeEnabled,
    swipe,
    safeQuestions,
  };
}
