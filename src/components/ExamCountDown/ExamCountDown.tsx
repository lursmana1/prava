"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ExamTimerProps = {
  initialSeconds: number;
  paused?: boolean;
  onTimeUp: () => void;
  restartKey?: number;
};

function formatTime(secondsLeft: number) {
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function ExamCountDown({
  initialSeconds,
  paused = false,
  onTimeUp,
  restartKey = 0,
}: ExamTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds, restartKey]);

  useEffect(() => {
    if (paused || secondsLeft <= 0) return;

    const id = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(id);
  }, [paused, secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0) onTimeUpRef.current();
  }, [secondsLeft]);

  const label = useMemo(() => formatTime(secondsLeft), [secondsLeft]);

  return <span className="text-yellow-300">{label}</span>;
}
