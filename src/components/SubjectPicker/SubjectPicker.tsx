"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Button, Checkbox, Divider, Row, Col } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Subject } from "@/lib/types/subject";
import { useTranslations } from "next-intl";

type SubjectPickerProps = {
  categoryId: number;
  subjects: Subject[];
};

export default function SubjectPicker({
  categoryId,
  subjects,
}: SubjectPickerProps) {
  const router = useRouter();
  const t = useTranslations("SubjectPicker");

  const allIds = useMemo(() => subjects.map((s) => s.id), [subjects]);
  const [selected, setSelected] = useState<number[]>(allIds);

  const options = useMemo(
    () =>
      subjects.map((s, idx) => ({
        label: `${idx + 1}. ${s.name}`,
        value: s.id,
        totalCount: s.questionsCount,
      })),
    [subjects],
  );

  const allChecked = selected.length === allIds.length && allIds.length > 0;
  const indeterminate = selected.length > 0 && !allChecked;

  const onChange = (values: (string | number)[]) => {
    setSelected(values as number[]);
  };

  const toggleAll = (e: CheckboxChangeEvent) => {
    setSelected(e.target.checked ? allIds : []);
  };

  const startExam = () => {
    if (!selected.length) return;
    const params = new URLSearchParams({
      category: String(categoryId),
      subjects: selected.join(","),
    });
    router.push(`/exam?${params.toString()}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 font-georgian!">
      <Divider className="my-4 hidden! md:block!" />

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Checkbox
          indeterminate={indeterminate}
          checked={allChecked}
          onChange={toggleAll}
          className="flex-1"
        >
          {t("toggleAll")}
        </Checkbox>

        <Button
          type="primary"
          size="large"
          disabled={!selected.length}
          onClick={startExam}
        >
          {t("startExam", { count: selected.length })}
        </Button>
      </div>

      <Divider className="my-4" />

      <Checkbox.Group value={selected} onChange={onChange} className="w-full">
        <Row>
          {options.map((opt) => (
            <Col key={String(opt.value)} xs={24} md={12}>
              <div className="py-2 px-2 rounded hover:bg-slate-50 transition">
                <Checkbox
                  value={opt.value}
                  className="text-[12px] font-bold font-georgian!"
                >
                  {opt.label}
                  {opt.totalCount && ` (${opt.totalCount})`}
                </Checkbox>
              </div>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </div>
  );
}
