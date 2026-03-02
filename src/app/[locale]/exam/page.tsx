import { fetchExamServerSafe } from "@/api/examAttemptsServer";
import ExamPageClient from "@/components/ExamQuiz/ExamPageClient";

type ExamPageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{
    subjects?: string | string[];
    category?: string;
  }>;
};

export default async function ExamPage({
  params,
  searchParams,
}: ExamPageProps) {
  const { locale } = await params;
  const sp = searchParams ? await searchParams : undefined;

  const subjectsRaw = sp?.subjects;
  const categoryRaw = sp?.category;

  let subjects: string[] = [];
  if (Array.isArray(subjectsRaw)) {
    subjects = subjectsRaw;
  } else if (typeof subjectsRaw === "string" && subjectsRaw.length > 0) {
    subjects = subjectsRaw.split(",");
  }

  const category = categoryRaw ? Number(categoryRaw) : 1;
  const subjectsStr = subjects.join(",");

  const { questions, attemptId } = await fetchExamServerSafe({
    lang: locale as "ka" | "en" | "ru",
    subjects: subjectsStr || undefined,
    categories: String(category),
    count: 30,
  });

  return <ExamPageClient questions={questions} attemptId={attemptId} />;
}
