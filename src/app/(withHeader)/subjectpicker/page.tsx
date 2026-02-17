import BaseApi from "@/api/BaseApi";
import { Category, CategoryWithSubjects } from "@/lib/types/category";
import CategorySelect from "@/components/categoryComponents/CategorySelect/CategorySelect";
import SubjectPicker from "@/components/SubjectPicker/SubjectPicker";

type PageProps = {
  searchParams?: Promise<{ category?: string }>;
};

const SubjectPickerPage = async ({ searchParams }: PageProps) => {
  const sp = searchParams ? await searchParams : {};

  const categories: Category[] = await BaseApi.get("/categories").then(
    (r) => r.data,
  );

  const categoryId = sp.category
    ? Number(sp.category)
    : (categories[0]?.id ?? 0);

  const categoryWithSubjects: CategoryWithSubjects = await BaseApi.get(
    `/categories/${categoryId}`,
  ).then((r) => r.data);

  return (
    <div className="section flex flex-col gap-6 justify-center items-center">
      <h1 className="font-georgian my-2 text-3xl font-bold">
        საკითხების არჩევა
      </h1>
      <CategorySelect categories={categories} activeCategoryId={categoryId} />
      <SubjectPicker
        categoryId={categoryId}
        subjects={categoryWithSubjects.subjects}
      />
    </div>
  );
};

export default SubjectPickerPage;
