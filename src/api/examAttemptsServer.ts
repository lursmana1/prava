import { getServerBaseApi } from "./ServerBaseApi";
import type { ExamQuestion } from "@/lib/types/exam";
import { normalizeQuestions } from "@/utills/helpers/normalizeQuestions";

type FetchExamParams = {
  lang: string;
  subjects?: string;
  categories?: string;
  count?: number;
  allSubjects?: boolean;
};

type FetchExamResult = {
  questions: ExamQuestion[];
  attemptId: number | null;
  endDate: string | null;
};

export async function fetchExamServer(
  params: FetchExamParams,
): Promise<FetchExamResult> {
  const searchParams = new URLSearchParams({
    lang: params.lang,
    count: String(params.count ?? 30),
  });
  if (params.subjects) searchParams.set("subjects", params.subjects);
  if (params.categories) searchParams.set("categories", params.categories);
  if (params.allSubjects) searchParams.set("allSubjects", "true");

  try {
    const api = await getServerBaseApi();
    const res = await api.post(`/exam-attempts/start?${searchParams}`);

    if (res.status === 401 || res.status === 403) {
      return fetchRandomQuestions(params);
    }

    if (res.status !== 200 && res.status !== 201) {
      throw new Error(`Exam fetch failed: ${res.status}`);
    }

    const data = res.data;
    return {
      questions: normalizeQuestions(data.questions),
      attemptId: data.attemptId ?? null,
      endDate: data.endDate ?? null,
    };
  } catch {
    return fetchRandomQuestions(params);
  }
}

export async function fetchExamServerSafe(
  params: FetchExamParams,
): Promise<FetchExamResult> {
  try {
    return await fetchExamServer(params);
  } catch {
    return { questions: [], attemptId: null, endDate: null };
  }
}

async function fetchRandomQuestions(
  params: FetchExamParams,
): Promise<FetchExamResult> {
  const searchParams = new URLSearchParams({
    lang: params.lang,
    count: String(params.count ?? 30),
    category: params.categories ?? "1",
  });
  if (params.subjects) searchParams.set("subjects", params.subjects);

  const api = await getServerBaseApi();
  const res = await api.get(`/questions/random?${searchParams}`);

  if (res.status !== 200) {
    throw new Error("Failed to fetch questions");
  }

  return {
    questions: normalizeQuestions(res.data),
    attemptId: null,
    endDate: null,
  };
}
