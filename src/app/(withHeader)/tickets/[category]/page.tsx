import BaseApi from "@/api/BaseApi";
import TicketsPagination from "@/components/antComponents/AntPagination/TicketPagination";
import CategoryCard from "@/components/categoryComponents/CategoryCard/CategoryCard";
import TicketQuiz from "@/components/TicketsQuiz/TicketsQuiz";
import { Category } from "@/lib/types/category";
import { type ExamQuestion, type QuestionsResponse } from "@/lib/types/exam";
import SubjectAsideMenu from "@/components/SubjectAsideMenu/SubjectAsideMenu";

type PageProps = {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ page?: string; size?: string; subjects?: string }>;
};

export default async function TicketsCategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category } = await params;
  const sp = searchParams ? await searchParams : {};

  const categoryId = Number(category);
  const page = Number(sp.page ?? "1");
  const size = Number(sp.size ?? "20");
  const subjects = sp.subjects ?? "";

  const [categories, questionsRes]: [Category[], QuestionsResponse] =
    await Promise.all([
      BaseApi.get("/categories").then((r) => r.data),
      BaseApi.get("/questions", {
        params: { category: categoryId, subjects, page, size },
      }).then((r) => r.data),
    ]);

  return (
    <div className="section space-y-6">
      {/* Top categories row (full width) */}
      <div className="flex gap-4 flex-wrap">
        {categories.map((c) => (
          <CategoryCard key={c.id} category={c} isActive={c.id === categoryId} />
        ))}
      </div>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        {/* LEFT */}
        <SubjectAsideMenu category={category} sp={sp} />

        {/* RIGHT */}
        <main className="space-y-6">
          <div className="flex justify-end">
            <TicketsPagination
              page={questionsRes.page}
              size={questionsRes.size}
              total={questionsRes.total}
            />
          </div>

          <div className="space-y-3">
            {questionsRes.items.map((q) => (
              <TicketQuiz key={q.id} question={q} />
            ))}
          </div>

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
