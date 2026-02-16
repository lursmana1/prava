"use client";

import { useState } from "react";
import Image from "next/image";
import { Category } from "@/lib/types/category";

type CategorySelectProps = {
  categories: Category[];
  onChange?: (categoryId: number) => void;
};

const CategorySelect = ({ categories, onChange }: CategorySelectProps) => {
  const [selectedId, setSelectedId] = useState<number>(categories[0]?.id ?? 0);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    onChange?.(id);
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((cat) => {
        const isActive = cat.id === selectedId;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleSelect(cat.id)}
            className={`
              flex flex-col items-center justify-center gap-1.5
              w-24 h-24 rounded-xl border-2 transition-all cursor-pointer
              ${
                isActive
                  ? "border-blue-600 bg-blue-600 text-white shadow-lg scale-105"
                  : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50"
              }
            `}
          >
            <Image
              src={`/svg/${cat.iconKey}.svg`}
              width={28}
              height={28}
              alt={cat.name}
              className={`w-auto h-auto ${isActive ? "brightness-0 invert" : "opacity-70"}`}
            />
            <span className="text-xs font-semibold leading-tight text-center">
              {cat.name}
            </span>
            <span className={`text-[10px] ${isActive ? "text-blue-100" : "text-gray-400"}`}>
              {cat.questionsCount}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CategorySelect;
