import BaseApi from "@/api/BaseApi";
import TicketsPagination from "@/components/antComponents/AntPagination/TicketPagination";
import CategoryCardsGrid from "@/components/categoryComponents/CategoryCardsGrid/CategoryCardsGrid";
import TicketsQuizList from "@/components/TicketsQuiz/TicketsQuizList";
import QuestionIdSearch from "@/components/QuestionIdSearch/QuestionIdSearch";
import { Category } from "@/lib/types/category";
import { type QuestionsResponse } from "@/lib/types/exam";
import SubjectAsideMenu from "@/components/SubjectAsideMenu/SubjectAsideMenu";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{ locale: string; category: string }>;
  searchParams?: Promise<{
    page?: string;
    size?: string;
    subjects?: string;
    questionId?: string;
  }>;
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
  const questionId = sp.questionId ?? "";

  const [categories, questionsRes]: [Category[], QuestionsResponse] =
    await Promise.all([
      BaseApi.get("/categories").then((r) => r.data),
      BaseApi.get(`/questions/${questionId ? questionId : ""}`, {
        params: {
          category: categoryId,
          subjects,
          page,
          size,
          lang: locale,
        },
      }).then((r) => r.data),
    ]);

  const rawItems = questionsRes?.items ?? questionsRes;
  const questions = Array.isArray(rawItems)
    ? rawItems
    : rawItems
      ? [rawItems]
      : [];

  const pagination = {
    page: questionsRes?.page ?? 1,
    size: questionsRes?.size ?? 20,
    total: questionsRes?.total ?? questions.length,
  };

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
          <Suspense
            fallback={
              <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
            }
          >
            <QuestionIdSearch category={category} currentParams={sp} />
          </Suspense>
          <div className="flex justify-end">
            <TicketsPagination
              page={pagination.page}
              size={pagination.size}
              total={pagination.total}
            />
          </div>

          <TicketsQuizList questions={questions} />

          <div className="flex justify-end">
            <TicketsPagination
              page={pagination.page}
              size={pagination.size}
              total={pagination.total}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
