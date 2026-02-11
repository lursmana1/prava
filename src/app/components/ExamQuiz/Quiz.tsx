"use client";

import { useEffect, useState } from "react";
import type { ExamQuestion } from "@/lib/types/exam";
import { useRouter } from "next/navigation";
import Image from "next/image";
import QuizButton from "../QuizButton/QuizButton";
import ExamHeader from "../ExamHeader/ExamHeader";

const EXAM_DURATION_SECONDS = 30 * 60;

export default function ExamQuiz({ questions }: { questions: ExamQuestion[] }) {
  console.log(questions, "zdd");

  if (!questions) return null;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistake, setMistake] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(EXAM_DURATION_SECONDS);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRestart = () => {
    router.refresh();
    setIndex(0);
    setScore(0);
    setMistake(0);
    setSelected(null);
  };

  const q = questions[index];
  if (!q) return null;

  const answers = [
    { key: "1", text: q.answer_1 },
    { key: "2", text: q.answer_2 },
    { key: "3", text: q.answer_3 },
    { key: "4", text: q.answer_4 },
  ].filter((a) => a.text);

  const handleSelect = (key: string) => {
    if (selected) return; // Already selected, can't change
    setSelected(key);
    if (key === q.correct_answer) {
      setScore(score + 1);
    } else {
      setMistake(mistake + 1);
    }
  };

  const handlePrevious = () => {
    setSelected(null);
    setIndex((i) => (i > 0 ? i - 1 : questions.length - 1));
  };

  const handleNext = () => {
    setSelected(null);
    setIndex((i) => (i + 1) % questions.length);
  };
  const totalAnswered = score + mistake;
  const examFinished = totalAnswered >= 30;
  const examSuccess = score >= 27;
  const examFailed = mistake > 3;

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  const timeLabel = `${minutes}:${seconds}`;

  // Check if exam is complete
  // Fail early if more than 3 mistakes
  if (examFailed) {
    return (
      <div className="p-4 max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">გამოცდა ჩაიჭრა</h1>
        <p className="mb-2">თქვენ დაუშვით {mistake} შეცდომა.</p>
        <p className="mb-4">სცადეთ თავიდან.</p>
        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          თავიდან დაწყება
        </button>
      </div>
    );
  }

  // Show result only after all 30 questions are answered
  if (examFinished) {
    return (
      <div className="p-4 max-w-md text-center">
        <h1
          className={`text-2xl font-bold mb-4 ${examSuccess ? "text-green-600" : "text-red-600"}`}
        >
          {examSuccess ? "გამოცდა ჩაბარებულია!" : "გამოცდა ჩაიჭრა"}
        </h1>
        <p className="mb-2">სწორი პასუხები: {score}/30</p>
        <p className="mb-2">შეცდომები: {mistake}</p>
        <p className="mb-4">
          {examSuccess
            ? "გილოცავთ! თქვენ წარმატებით ჩააბარეთ გამოცდა."
            : "სამწუხაროდ, ვერ ჩააბარეთ. სცადეთ თავიდან."}
        </p>
        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          თავიდან დაწყება
        </button>
      </div>
    );
  }
  console.log(q);

  return (
    <>
      <div className="p-4 ">
        <ExamHeader
          timeLabel={timeLabel}
          currentQuestion={index + 1}
          totalQuestions={questions.length}
          correct={score}
          mistakes={mistake}
          questionId={q.id}
        />
        <p className="font-georgian mb-4">{q.question}</p>
        <Image
          src={q.img ? "/" + q.img : "/png/download.png"}
          alt={q.question || ""}
          className="w-full h-100"
          width={"1000"}
          height={500}
        />
        <div className="space-y-2 grid grid-cols-2 gap-2">
          {answers.map((a) => (
            // <button
            //   key={a.key}
            //   onClick={() => handleSelect(a.key)}
            //   disabled={!!selected}
            //   className={` w-full text-left flex  items-center p-2 rounded border transition-colors h-20 ${
            //     selected
            //       ? a.key === q.correct_answer
            //         ? "bg-green-100 border-green-500"
            //         : selected === a.key
            //           ? "bg-red-100 border-red-500"
            //           : "border-gray-300"
            //       : "border-gray-300 hover:border-blue-300 cursor-pointer"
            //   } ${selected ? "cursor-default" : ""}`}
            // >
            //   {a.text}
            // </button>
            <QuizButton
              key={a.key}
              selectAnswer={handleSelect}
              answerKey={a.key}
              answerText={a.text!}
              selectedAnswer={selected || ""}
              correctAnswer={q.correct_answer}
            >
              {a.text}
            </QuizButton>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            className="mt-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            წინა
          </button>
          <button
            onClick={handleNext}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            შემდეგი
          </button>
        </div>
      </div>
    </>
  );
}
