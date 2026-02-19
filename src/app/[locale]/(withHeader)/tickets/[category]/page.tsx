import BaseApi from "@/api/BaseApi";
import TicketsPagination from "@/components/antComponents/AntPagination/TicketPagination";
import CategoryCardsGrid from "@/components/categoryComponents/CategoryCardsGrid/CategoryCardsGrid";
import TicketsQuizList from "@/components/TicketsQuiz/TicketsQuizList";
import { Category } from "@/lib/types/category";
import { type QuestionsResponse } from "@/lib/types/exam";
import SubjectAsideMenu from "@/components/SubjectAsideMenu/SubjectAsideMenu";

type PageProps = {
  params: Promise<{ locale: string; category: string }>;
  searchParams?: Promise<{ page?: string; size?: string; subjects?: string }>;
};

export default async function TicketsCategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { locale, category } = await params;
  const sp = searchParams ? await searchParams : {};

  const categoryId = Number(category);
  const page = Number(sp.page ?? "1");
  const size = Number(sp.size ?? "20");
  const subjects = sp.subjects ?? "";

  const [categories, questionsRes]: [Category[], QuestionsResponse] =
    await Promise.all([
      BaseApi.get("/categories").then((r) => r.data),
      BaseApi.get("/questions", {
        params: { category: categoryId, subjects, page, size, lang: locale },
      }).then((r) => r.data),
    ]);
  console.log(questionsRes, "zd");

  return (
    <div className="section space-y-6">
      {/* Top categories - 2 cols mobile, 1 col desktop */}
      <CategoryCardsGrid
        categories={categories}
        activeCategoryId={categoryId}
      />

      {/* 2-column layout: content first on mobile, sidebar left on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        {/* LEFT - sidebar on desktop, below content on mobile */}
        <SubjectAsideMenu category={category} sp={sp} />

        {/* RIGHT - main content */}
        <main className="space-y-6 order-1 lg:order-2">
          <div className="flex justify-end">
            <TicketsPagination
              page={questionsRes.page}
              size={questionsRes.size}
              total={questionsRes.total}
            />
          </div>

          <TicketsQuizList questions={questionsRes.items} />

          <div className="flex justify-end">
            <TicketsPagination
              page={questionsRes.page}
              size={questionsRes.size}
              total={questionsRes.total}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
