"use client";

import { useTransition } from "react";
import Image from "next/image";
import { Select } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/lib/types/category";

type CategorySelectProps = {
  categories: Category[];
  activeCategoryId: number;
};

const CategorySelect = ({
  categories,
  activeCategoryId,
}: CategorySelectProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSelect = (id: number) => {
    const sp = new URLSearchParams(searchParams.toString());
    sp.set("category", String(id));
    startTransition(() => {
      router.push(`/subjectpicker?${sp.toString()}`);
    });
  };

  return (
    <Select
      value={activeCategoryId}
      onChange={handleSelect}
      className="w-full [&_.ant-select-selector]:h-14! [&_.ant-select-selection-item]:text-lg! [&_.ant-select-selection-item]:leading-14!"
      size="large"
      optionLabelProp="label"
    >
      {categories.map((cat) => (
        <Select.Option
          key={cat.id}
          value={cat.id}
          label={
            <span className="inline-flex items-center gap-3">
              <Image
                src={`/svg/${cat.iconKey}.svg`}
                width={28}
                height={28}
                alt={cat.name}
                className="w-7 h-7 shrink-0 opacity-80"
              />
              <span className="text-lg font-semibold">{cat.name}</span>
            </span>
          }
        >
          <div className="flex items-center gap-4 py-1">
            <Image
              src={`/svg/${cat.iconKey}.svg`}
              width={28}
              height={28}
              alt={cat.name}
              className="w-7 h-7 shrink-0 opacity-80"
            />
            <span className="text-base font-semibold">{cat.name}</span>
            <span className="text-sm text-gray-400 ml-auto">
              {cat.questionsCount} კითხვა
            </span>
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};

export default CategorySelect;
