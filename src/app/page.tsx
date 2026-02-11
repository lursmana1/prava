import Image from "next/image";
import Link from "next/link";

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
    <>
      <div className="section">
        <img
          className="w-full h-full object-cover rounded-lg"
          src="https://static.vecteezy.com/system/resources/thumbnails/022/536/549/small/modern-banner-background-colorful-blue-and-purple-gradations-circles-eps-10-free-vector.jpg"
          alt="banner"
          width={1000}
          height={1000}
        />
      </div>
      <div className="flex items-center justify-center">
        <main className="section">
          <h1 className="font-georgian font-bold text-2xl">
            გამოცდის ბილეთები
          </h1>
        </main>
      </div>
    </>
  );
}
