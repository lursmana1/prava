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
  questions: ExamQuestion[];
};

export type SubmitAnswerResponse = {
  correct: boolean;
};

export async function startPersonalizedExam(
  params: StartExamParams = {}
): Promise<StartExamResponse> {
  const searchParams = new URLSearchParams();
  if (params.lang) searchParams.set("lang", params.lang);
  if (params.count) searchParams.set("count", String(params.count));
  if (params.subjects) searchParams.set("subjects", params.subjects);
  if (params.categories) searchParams.set("categories", params.categories);
  if (params.allSubjects) searchParams.set("allSubjects", params.allSubjects);

  const res = await BaseApi.post<StartExamResponse>(
    `/exam-attempts/start?${searchParams.toString()}`
  );
  return res.data;
}

export async function submitAnswer(
  attemptId: number,
  questionId: number | string,
  chosenAnswer: string
): Promise<SubmitAnswerResponse> {
  const qId = typeof questionId === "number" ? questionId : parseInt(String(questionId), 10);
  const res = await BaseApi.post<SubmitAnswerResponse>(
    `/exam-attempts/${attemptId}/answer`,
    { questionId: qId, chosenAnswer }
  );
  return res.data;
}
