import BaseApi from "@/api/BaseApi";
import ExamQuiz from "@/components/ExamQuiz/Quiz";

type ExamPageProps = {
  searchParams?: Promise<{
    subjects?: string | string[];
    category?: string;
  }>;
};

export default async function ExamPage({ searchParams }: ExamPageProps) {
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

  const questions = await BaseApi.get("/questions/random", {
    params: {
      subjects: subjects.join(","),
      category: category,
      count: 30,
    },
  }).then((r) => r.data);

  return (
    <div className="bg-[#193e4a]">
      <div className="section">
        {/* <h1>გამოცდა</h1> */}
        <ExamQuiz questions={questions} />
      </div>
    </div>
  );
}
