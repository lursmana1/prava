import BaseApi from "@/api/BaseApi";
import ExamQuiz from "@/components/ExamQuiz/Quiz";

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
  console.log(locale, "zd");

  const questions = await BaseApi.get("/questions/random", {
    params: {
      subjects: subjects.join(","),
      category: category,
      count: 30,
      lang: locale,
    },
  }).then((r) => r.data);

  return (
    <div className="bg-[#193e4a]">
      <div className="section">
        <ExamQuiz questions={questions} />
      </div>
    </div>
  );
}
