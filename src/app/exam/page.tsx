import BaseApi from "@/api/BaseApi";
import ExamQuiz from "@/components/ExamQuiz/Quiz";

type ExamPageProps = {
  searchParams?: Promise<{ subjects?: string | string[] }>;
};

export default async function ExamPage({ searchParams }: ExamPageProps) {
  const sp = searchParams ? await searchParams : undefined;

  const subjectsRaw = sp?.subjects;

  let subjects: string[] = [];
  if (Array.isArray(subjectsRaw)) {
    subjects = subjectsRaw;
  } else if (typeof subjectsRaw === "string" && subjectsRaw.length > 0) {
    subjects = subjectsRaw.split(",");
  }

  const questions = await BaseApi.get("/questions", {
    params: { subjects: subjects.join(","), random: 30, categories: 1 },
  }).then((r) => r.data);
  console.log(questions);

  return (
    <div className="bg-[#193e4a]">
      <div className="section">
        {/* <h1>გამოცდა</h1> */}
        <ExamQuiz questions={questions} />
      </div>
    </div>
  );
}
