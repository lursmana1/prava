import { Metadata } from "next";
import Quiz from "@/components/Quiz/Quiz";
import exams from "../../public/CONSTS/exams";
import axios from "axios";
interface HomePageProps {
  params: any;
}

// export async function generateMetadata({
//   params,
// }: HomePageProps): Promise<Metadata> {
//   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://vooly.ge";

//   return {
//     title: "main_page_title",
//     description: "SATAMASHI GABEBI",
//     alternates: {
//       canonical: BASE_URL,
//     },
//     openGraph: {
//       type: "website",
//       title: "main_page_title",
//       description: "main_page_description",
//       url: BASE_URL,
//       images: [
//         {
//           url: `${BASE_URL}/images/cover.webp`,
//           width: 1200,
//           height: 660,
//         },
//       ],
//     },
//     twitter: {
//       title: "main_page_title",
//       description: "main_page_description",
//     },
//   };
// }

export default async function Home() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // category=0 means all questions, category=1 means only category 1, etc.
  const response = await axios
    .get(`${BASE_URL}/questions?random=30&categories=6&subjects=18,19`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return [];
    });
  console.log("zdarovaa");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="section">
        <Quiz questions={response} />
      </main>
    </div>
  );
}
