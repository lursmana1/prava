"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { subjects } from "@/CONSTS/CategoryDummy";

export default function SubjectPicker() {
  const router = useRouter();
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selected.length === subjects.length) {
      setSelected([]);
    } else {
      setSelected(subjects.map((s) => s.id));
    }
  };

  const startExam = () => {
    if (!selected.length) return;
    router.push(`/exam?subjects=${selected.join(",")}`);
  };

  return (
    <div>
      {/* Select all */}
      <label style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          type="checkbox"
          checked={selected.length === subjects.length}
          onChange={toggleAll}
        />
        ყველას მონიშვნა / მოხსნა
      </label>

      {/* Subject list */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px 40px",
        }}
      >
        {subjects.map((subject, index) => (
          <label
            key={subject.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={selected.includes(subject.id)}
              onChange={() => toggle(subject.id)}
            />
            <span>
              {index + 1}. {subject.name}
            </span>
          </label>
        ))}
      </div>

      {/* Start button */}
      <button
        disabled={!selected.length}
        onClick={startExam}
        style={{
          marginTop: "24px",
          padding: "12px 24px",
          background: selected.length ? "#1e9b4b" : "#ccc",
          color: "white",
          borderRadius: "6px",
          cursor: selected.length ? "pointer" : "not-allowed",
          border: "none",
        }}
      >
        გამოცდის დაწყება ({selected.length})
      </button>
    </div>
  );
}
