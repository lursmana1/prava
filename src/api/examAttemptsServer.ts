import { cookies } from "next/headers";
import type { ExamQuestion } from "@/lib/types/exam";

type FetchExamParams = {
  lang: string;
  subjects?: string;
  categories?: string;
  count?: number;
};

type FetchExamResult = {
  questions: ExamQuestion[];
  attemptId: number | null;
};

function normalizeQuestions(data: unknown): ExamQuestion[] {
  if (Array.isArray(data)) return data as ExamQuestion[];
  if (data && typeof data === "object" && "items" in data) {
    return (data as { items: ExamQuestion[] }).items ?? [];
  }
  if (data && typeof data === "object" && "questions" in data) {
    return (data as { questions: ExamQuestion[] }).questions ?? [];
  }
  return [];
}

export async function fetchExamServer(params: FetchExamParams): Promise<FetchExamResult> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not set");
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const searchParams = new URLSearchParams({
    lang: params.lang,
    count: String(params.count ?? 30),
  });
  if (params.subjects) searchParams.set("subjects", params.subjects);
  if (params.categories) searchParams.set("categories", params.categories);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(cookieHeader ? { Cookie: cookieHeader } : {}),
  };

  try {
    const res = await fetch(`${baseUrl}/exam-attempts/start?${searchParams}`, {
      method: "POST",
      headers,
      cache: "no-store",
    });

    if (res.status === 401 || res.status === 403) {
      return fetchRandomQuestions(baseUrl, params);
    }

    if (!res.ok) {
      throw new Error(`Exam fetch failed: ${res.status}`);
    }

    const data = await res.json();
    return {
      questions: normalizeQuestions(data.questions),
      attemptId: data.attemptId ?? null,
    };
  } catch {
    return fetchRandomQuestions(baseUrl, params);
  }
}

export async function fetchExamServerSafe(
  params: FetchExamParams
): Promise<FetchExamResult> {
  try {
    return await fetchExamServer(params);
  } catch {
    return { questions: [], attemptId: null };
  }
}

async function fetchRandomQuestions(
  baseUrl: string,
  params: FetchExamParams
): Promise<FetchExamResult> {
  const searchParams = new URLSearchParams({
    lang: params.lang,
    count: String(params.count ?? 30),
    category: params.categories ?? "1",
  });
  if (params.subjects) searchParams.set("subjects", params.subjects);

  const res = await fetch(`${baseUrl}/questions/random?${searchParams}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  const data = await res.json();
  return {
    questions: normalizeQuestions(data),
    attemptId: null,
  };
}
