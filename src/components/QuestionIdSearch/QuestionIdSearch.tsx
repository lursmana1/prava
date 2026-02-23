"use client";

import { useRouter, usePathname } from "next/navigation";
import { Input } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type QuestionIdSearchProps = {
  category: string;
  currentParams: { page?: string; size?: string; subjects?: string };
};

export default function QuestionIdSearch({
  category,
  currentParams,
}: QuestionIdSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const questionIdFromUrl = searchParams.get("questionId") ?? "";
  const [value, setValue] = useState(questionIdFromUrl);

  useEffect(() => {
    setValue(questionIdFromUrl);
  }, [questionIdFromUrl]);

  const handleSearch = useCallback(
    (id: string) => {
      const trimmed = id.trim();
      const params = new URLSearchParams();

      if (currentParams.size) params.set("size", currentParams.size);
      if (currentParams.subjects) params.set("subjects", currentParams.subjects);
      params.set("page", "1");

      if (trimmed) {
        params.set("questionId", trimmed);
      } else {
        params.delete("questionId");
      }

      const qs = params.toString();
      router.push(`${pathname}${qs ? `?${qs}` : ""}`);
    },
    [currentParams, pathname, router],
  );

  return (
    <Input.Search
      placeholder="Question ID"
      allowClear
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={handleSearch}
      onPressEnter={(e) => handleSearch((e.target as HTMLInputElement).value)}
      className="max-w-xs"
    />
  );
}
