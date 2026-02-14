// useExamProgress.ts
import { useMemo } from "react";
import type { ExamQuestion } from "@/lib/types/exam";

export function useExamProgress(
  examQuestions: ExamQuestion[],
  answersById: Record<string, string>,
) {
  return useMemo(() => {
    let score = 0;
    let mistake = 0;
    let totalAnswered = 0;

    for (const q of examQuestions) {
      const picked = answersById[String(q.id)];
      if (!picked) continue;

      totalAnswered += 1;
      if (picked === q.correct_answer) score += 1;
      else mistake += 1;
    }

    return { score, mistake, totalAnswered };
  }, [examQuestions, answersById]);
}
