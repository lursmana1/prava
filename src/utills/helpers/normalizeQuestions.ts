import type { ExamQuestion } from "@/lib/types/exam";

/** Normalize API response to ExamQuestion[]. Handles items, questions, or raw array. */
export function normalizeQuestions(data: unknown): ExamQuestion[] {
  if (Array.isArray(data)) return data as ExamQuestion[];
  if (data && typeof data === "object" && "items" in data) {
    return (data as { items: ExamQuestion[] }).items ?? [];
  }
  if (data && typeof data === "object" && "questions" in data) {
    return (data as { questions: ExamQuestion[] }).questions ?? [];
  }
  return [];
}
