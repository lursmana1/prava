import { ExamQuestion } from "@/lib/types/exam";

export const getAnswers = (q: ExamQuestion) =>
  [
    { key: "1", text: q.answer_1 },
    { key: "2", text: q.answer_2 },
    { key: "3", text: q.answer_3 },
    { key: "4", text: q.answer_4 },
  ].filter((a) => Boolean(a.text));
