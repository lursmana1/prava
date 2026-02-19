import CategoryCard from "@/components/categoryComponents/CategoryCard/CategoryCard";
import { Category } from "@/lib/types/category";

type CategoryCardsGridProps = {
  categories: Category[];
  activeCategoryId: number;
};

export default function CategoryCardsGrid({
  categories,
  activeCategoryId,
}: CategoryCardsGridProps) {
  return (
    <div
      className="grid grid-cols-5 lg:grid-rows-1 lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-2 lg:gap-4"
      style={
        {
          "--cols": categories.length,
        } as React.CSSProperties & { "--cols": number }
      }
    >
      {categories.map((c) => (
        <CategoryCard
          key={c.id}
          category={c}
          isActive={c.id === activeCategoryId}
        />
      ))}
    </div>
  );
}
