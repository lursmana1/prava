import BaseApi from "@/api/BaseApi";
import { Category, CategoryWithSubjects } from "@/lib/types/category";
import CategorySelect from "@/components/categoryComponents/CategorySelect/CategorySelect";
import SubjectPicker from "@/components/SubjectPicker/SubjectPicker";
import { getTranslations } from "next-intl/server";

type PageProps = {
  searchParams?: Promise<{ category?: string }>;
};

const SubjectPickerPage = async ({ searchParams }: PageProps) => {
  const sp = searchParams ? await searchParams : {};
  const t = await getTranslations("SubjectPicker");

  const categories: Category[] = await BaseApi.get("/categories").then(
    (r) => r.data,
  );

  const categoryId = sp.category
    ? Number(sp.category)
    : (categories[1]?.id ?? 1);

  const categoryWithSubjects: CategoryWithSubjects = await BaseApi.get(
    `/categories/${categoryId}`,
  ).then((r) => r.data);

  return (
    <div className="section flex flex-col gap-4 py-6 lg:gap-3 lg:py-4 justify-center items-center">
      <h1 className="font-georgian text-3xl font-bold">
        {t("pageTitle")}
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
