"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Select } from "antd";

type Subject = { id: number; name: string };

type Props = {
  category: string;
  sp: { page?: string; size?: string; subjects?: string };
  subjects: Subject[];
  label: string;
};

function normalizeSelected(subjectsParam?: string) {
  const raw = (subjectsParam ?? "").trim();
  if (!raw) return undefined;
  return raw;
}

export default function SubjectSelectMobile({
  category,
  sp,
  subjects,
  label,
}: Props) {
  const router = useRouter();

  const selected = useMemo(() => normalizeSelected(sp.subjects), [sp.subjects]);

  const handleChange = (value: string) => {
    const params = new URLSearchParams();
    if (sp.size) params.set("size", sp.size);
    params.set("page", "1");
    if (value) params.set("subjects", value);

    const qs = params.toString();
    router.push(`/tickets/${category}${qs ? `?${qs}` : ""}`);
  };

  const options = [
    { value: "", label: "ყველა საგანი" },
    ...subjects.map((s) => ({ value: String(s.id), label: s.name })),
  ];

  return (
    <div className="lg:hidden min-w-0 max-w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2 truncate">
        {label}
      </label>

      <Select
        value={selected ?? ""}
        onChange={handleChange}
        options={options}
        className="w-full min-w-0 [&_.ant-select-selector]:min-h-0! [&_.ant-select-selection-item]:truncate! [&_.ant-select-selection-placeholder]:truncate!"
        style={{ maxWidth: "100%" }}
        listHeight={280}
      />
    </div>
  );
}
