"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Divider, Row, Col, Card } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { subjects } from "@/CONSTS/subjectDummy";

export default function SubjectPicker() {
  const router = useRouter();

  // Ant Checkbox.Group is happy with number[] as long as option values are numbers
  const options = useMemo(
    () =>
      subjects.map((s, idx) => ({
        label: `${idx + 1}. ${s.name}`,
        value: s.id, // number
      })),
    [],
  );

  const allIds = useMemo(() => subjects.map((s) => s.id), []);

  const [selected, setSelected] = useState<number[]>([]);

  const allChecked = selected.length === allIds.length;
  const indeterminate = selected.length > 0 && !allChecked;

  const onChange = (values: (string | number)[]) => {
    // values will be numbers in your case, but Ant types it loosely
    setSelected(values as number[]);
  };

  const toggleAll = (e: CheckboxChangeEvent) => {
    setSelected(e.target.checked ? allIds : []);
  };

  const startExam = () => {
    if (!selected.length) return;
    const ids = selected.join(",");
    router.push(`/exam?subjects=${encodeURIComponent(ids)}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 font-georgian!">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Checkbox
          indeterminate={indeterminate}
          checked={allChecked}
          onChange={toggleAll}
        >
          ყველას მონიშვნა / მოხსნა
        </Checkbox>

        <Button
          type="primary"
          size="large"
          disabled={!selected.length}
          onClick={startExam}
        >
          გამოცდის დაწყება ({selected.length})
        </Button>
      </div>

      <Divider className="my-4" />

      <Checkbox.Group value={selected} onChange={onChange} className="w-full">
        <Row gutter={[24, 12]}>
          {options.map((opt) => (
            <Col key={String(opt.value)} xs={24} md={12}>
              <div className="py-2 px-2 rounded hover:bg-slate-50 transition">
                <Checkbox value={opt.value} className="text-[15px]">
                  {opt.label}
                </Checkbox>
              </div>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </div>
  );
}
