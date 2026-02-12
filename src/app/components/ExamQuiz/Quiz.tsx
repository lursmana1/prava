"use client";

import { useEffect, useMemo, useState } from "react";
import type { ExamQuestion } from "@/lib/types/exam";
import Image from "next/image";
import QuizButton from "../QuizButton/QuizButton";
import ExamHeader from "../ExamHeader/ExamHeader";
import ExamRetryModal from "../Modals/ExamRetryModal.tsx/ExamRetryModal";
import ExamFooter from "../ExamFooter/ExamFooter";

const EXAM_DURATION_SECONDS = 30 * 60;
const EXAM_TOTAL_QUESTIONS = 30;
const PASS_SCORE = 27;
const MAX_MISTAKES = 3;

export default function ExamQuiz({ questions }: { questions: ExamQuestion[] }) {
  const safeQuestions = Array.isArray(questions) ? questions : [];
  if (!safeQuestions.length) return null;

  const examQuestions = useMemo(
    () => safeQuestions.slice(0, EXAM_TOTAL_QUESTIONS),
    [safeQuestions],
  );

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [secondsLeft, setSecondsLeft] = useState(EXAM_DURATION_SECONDS);

  // answers stored per question id (string keys => no TS issues)
  const [answersById, setAnswersById] = useState<Record<string, string>>({});

  const q = examQuestions[index];
  if (!q) return null;

  const qId = String(q.id);
  const selectedAnswer = answersById[qId] ?? null;

  const answers = [
    { key: "1", text: q.answer_1 },
    { key: "2", text: q.answer_2 },
    { key: "3", text: q.answer_3 },
    { key: "4", text: q.answer_4 },
  ].filter((a) => Boolean(a.text));

  const { score, mistake, totalAnswered } = useMemo(() => {
    let s = 0;
    let m = 0;
    let answered = 0;

    for (const question of examQuestions) {
      const picked = answersById[String(question.id)];
      if (!picked) continue;

      answered += 1;
      if (picked === question.correct_answer) s += 1;
      else m += 1;
    }

    return { score: s, mistake: m, totalAnswered: answered };
  }, [answersById, examQuestions]);

  const examFinished =
    totalAnswered >= EXAM_TOTAL_QUESTIONS || secondsLeft <= 0;
  const examSuccess = score >= PASS_SCORE;
  const examFailed = mistake > MAX_MISTAKES;

  // Timer (stops when finished)
  useEffect(() => {
    if (examFinished) return;

    const id = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(id);
  }, [examFinished]);

  const handleRestart = () => {
    setIndex(0);
    setDirection("next");
    setSecondsLeft(EXAM_DURATION_SECONDS);
    setAnswersById({});
  };

  // lock answer per question (no changing)
  const handleSelect = (key: string) => {
    if (examFinished || examFailed) return;
    if (answersById[qId]) return;

    setAnswersById((prev) => ({ ...prev, [qId]: key }));
  };

  const handlePrevious = () => {
    if (examFinished || examFailed) return;
    setDirection("prev");
    setIndex((i) => (i > 0 ? i - 1 : examQuestions.length - 1));
  };

  const handleNext = () => {
    if (examFinished || examFailed) return;
    setDirection("next");
    setIndex((i) => (i + 1) % examQuestions.length);
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  const timeLabel = `${minutes}:${seconds}`;

  if (examFinished) {
    return (
      <div className="p-4 max-w-md mx-auto text-center">
        <h1
          className={`text-2xl font-bold mb-4 ${
            examSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {examSuccess ? "გამოცდა ჩაბარებულია!" : "გამოცდა ჩაიჭრა"}
        </h1>

        <p className="mb-2">
          სწორი პასუხები: {score}/{EXAM_TOTAL_QUESTIONS}
        </p>
        <p className="mb-4">შეცდომები: {mistake}</p>

        {secondsLeft <= 0 && totalAnswered < EXAM_TOTAL_QUESTIONS && (
          <p className="mb-3 text-sm text-gray-600">დრო ამოიწურა.</p>
        )}

        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          თავიდან დაწყება
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        className="p-4 h-[90vh] overflow-auto overflow-x-hidden"
        style={{
          backgroundImage: "url('/png/download.png')",
          backgroundColor: "#193e4a",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <ExamHeader
          timeLabel={timeLabel}
          currentQuestion={index + 1}
          totalQuestions={examQuestions.length}
          correct={score}
          mistakes={mistake}
          questionId={q.id}
        />

        {/* In-flow slide animation (no absolute => no layout breaking) */}
        <div
          key={qId}
          className={
            direction === "next"
              ? "animate-slide-in-next"
              : "animate-slide-in-prev"
          }
        >
          {!!q.hasImg && (
            <Image
              src={q.img ? "/" + q.img : "/png/download.png"}
              alt={q.question || ""}
              // className="w-full h-auto"
              className="m-auto"
              width={1000}
              height={410}
              priority
            />
          )}

          <p className="font-georgian p-4 text-white text-sm border border-white bg-black/50 rounded-md mb-4">
            {q.question}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 auto-rows-fr items-stretch">
            {answers.map((a) => (
              <QuizButton
                key={a.key}
                selectAnswer={handleSelect}
                answerKey={a.key}
                answerText={a.text as string}
                selectedAnswer={selectedAnswer || ""}
                correctAnswer={q.correct_answer}
              />
            ))}
          </div>
        </div>
      </div>

      <ExamFooter
        questions={answers}
        showPrevious={handlePrevious}
        showNext={handleNext}
        selectAnswer={handleSelect}
      />

      {examFailed && (
        <ExamRetryModal handleRestart={handleRestart} mistake={mistake} />
      )}
    </>
  );
}
