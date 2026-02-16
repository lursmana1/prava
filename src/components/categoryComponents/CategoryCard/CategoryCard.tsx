import { Category } from "@/lib/types/category";
import Link from "next/link";
import Image from "next/image";

type CategoryCardProps = {
  category: Category;
  isActive?: boolean;
};

const CategoryCard = ({ category, isActive }: CategoryCardProps) => {
  return (
    <Link
      href={`/tickets/${category.id}`}
      className={`
        w-28 rounded-xl p-3
        flex flex-col items-center justify-center
        gap-2 text-center
        transition select-none
        ${
          isActive
            ? "bg-blue-600 text-white shadow-md"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }
      `}
    >
      <Image
        src={`/svg/${category.iconKey}.svg`}
        width={32}
        height={32}
        alt={category.name}
        className={`w-auto h-auto ${isActive ? "brightness-0 invert" : "opacity-80"}`}
      />

      <span className="font-medium text-sm">{category.name}</span>
    </Link>
  );
};

export default CategoryCard;
