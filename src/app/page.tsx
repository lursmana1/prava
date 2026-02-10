import { Metadata } from "next";
import Quiz from "@/components/ExamQuiz/Quiz";
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
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="section">
        <h1>გამოცდის ბილეთები</h1>
      </main>
    </div>
  );
}
