import BaseApi from "@/app/api/BaseApi";
import ExamQuiz from "@/app/components/ExamQuiz/Quiz";

// Disable Next.js static caching for this page

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

  // if (subjects.length === 0) {
  //   return (
  //     <div className="section">
  //       <h1>გამოცდა</h1>
  //       <p>აირჩიე საგანი</p>
  //     </div>
  //   );
  // }

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
