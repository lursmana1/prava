import { Category } from "@/lib/types/category";
import Link from "next/link";
import Image from "next/image";

type CategoryCardProps = {
  category: Category;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      href={`/tickets/${category.id}`}
      className=" w-40 rounded-xl bg-gray-200 p-4 flex flex-col items-center justify-center gap-3 text-center hover:bg-gray-300 transition select-none "
    >
      <Image
        src={`/svg/${category.iconKey}.svg`}
        width={72}
        height={72}
        alt={category.name}
        className="opacity-80"
      />

      <span className="text-gray-700 font-medium">{category.name}</span>
    </Link>
  );
};

export default CategoryCard;
