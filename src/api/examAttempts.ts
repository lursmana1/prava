import BaseApi from "./BaseApi";
import type { ExamQuestion } from "@/lib/types/exam";

export type StartExamParams = {
  lang?: string;
  subjects?: string;
  categories?: string;
  count?: number;
  allSubjects?: string;
};

export type StartExamResponse = {
  attemptId: number;
  endDate: string;
  questions: ExamQuestion[];
};

export type SubmitAnswerResponse = {
  correct: boolean;
};

export type FinishExamResponse = {
  completedAt: string;
  passed: boolean;
  durationSeconds: number;
};

export type AttemptSummary = {
  id: number;
  questionCount: number;
  answeredCount: number;
  correctCount: number;
  createdAt: string;
  endDate: string | null;
  completedAt: string | null;
  passed: boolean | null;
  durationSeconds: number | null;
};

export type AttemptsHistoryResponse = {
  data: AttemptSummary[];
  total: number;
  page: number;
  totalPages: number;
};

export async function startPersonalizedExam(
  params: StartExamParams = {},
): Promise<StartExamResponse> {
  const searchParams = new URLSearchParams();
  if (params.lang) searchParams.set("lang", params.lang);
  if (params.count) searchParams.set("count", String(params.count));
  if (params.subjects) searchParams.set("subjects", params.subjects);
  if (params.categories) searchParams.set("categories", params.categories);
  if (params.allSubjects !== undefined)
    searchParams.set("allSubjects", String(params.allSubjects));

  const res = await BaseApi.post<StartExamResponse>(
    `/exam-attempts/start?${searchParams.toString()}`,
  );
  return res.data;
}

export async function finishExam(
  attemptId: number,
): Promise<FinishExamResponse> {
  const res = await BaseApi.post<FinishExamResponse>(
    `/exam-attempts/${attemptId}/finish`,
  );
  return res.data;
}

export async function getAttempt(attemptId: number): Promise<{
  id: number;
  questionIds: number[];
  questions: ExamQuestion[];
  answers: unknown[];
  createdAt: string;
  endDate: string | null;
  completedAt: string | null;
  passed: boolean | null;
  durationSeconds: number | null;
}> {
  const res = await BaseApi.get(`/exam-attempts/${attemptId}`);
  return res.data;
}

export async function getAttemptsHistory(
  page = 1,
  size = 10,
): Promise<AttemptsHistoryResponse> {
  const res = await BaseApi.get<AttemptsHistoryResponse>("/exam-attempts", {
    params: { page, size },
  });
  return res.data;
}

export async function submitAnswer(
  attemptId: number,
  questionId: number | string,
  chosenAnswer: string,
): Promise<SubmitAnswerResponse> {
  const qId =
    typeof questionId === "number"
      ? questionId
      : parseInt(String(questionId), 10);
  const res = await BaseApi.post<SubmitAnswerResponse>(
    `/exam-attempts/${attemptId}/answer`,
    { questionId: qId, chosenAnswer },
  );
  return res.data;
}
