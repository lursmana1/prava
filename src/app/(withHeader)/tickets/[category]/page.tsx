import BaseApi from "@/api/BaseApi";
import TicketsPagination from "@/components/antComponents/AntPagination/TicketPagination";
import CategoryCard from "@/components/categoryComponents/CategoryCard/CategoryCard";
import { Category } from "@/lib/types/category";

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

  const categories: Category[] = await BaseApi.get("/categories").then(
    (r) => r.data,
  );

  const questionsRes = await BaseApi.get("/questions", {
    params: {
      category: categoryId, // single selected category id
      subjects, // "1,2,3" or ""
      page,
      size,
    },
  }).then((r) => r.data);

  return (
    <div className="section space-y-6">
      <div className="flex gap-4 flex-wrap">
        {categories.map((c) => (
          <CategoryCard key={c.id} category={c} />
        ))}
      </div>

      <div className="flex justify-end">
        <TicketsPagination
          page={questionsRes.page}
          size={questionsRes.size}
          total={questionsRes.total}
        />
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {questionsRes.items.map((q: any) => (
          <div key={q.id ?? q._id} className="p-3 rounded border bg-white">
            <div className="font-medium">{q.question}</div>
          </div>
        ))}
      </div>

      {/* Optional bottom pagination too */}
      <div className="flex justify-end">
        <TicketsPagination
          page={questionsRes.page}
          size={questionsRes.size}
          total={questionsRes.total}
        />
      </div>
    </div>
  );
}
