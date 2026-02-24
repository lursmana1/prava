import { useCallback, useEffect, useRef, useState } from "react";
import { AUTO_ADVANCE_STORAGE_KEY } from "@/CONSTS/QuizExamConstats";

export function useAutoAdvance() {
  const [autoAdvance, setAutoAdvance] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setAutoAdvance(localStorage.getItem(AUTO_ADVANCE_STORAGE_KEY) === "true");
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const handleAutoAdvanceChange = useCallback((checked: boolean) => {
    setAutoAdvance(checked);
    localStorage.setItem(AUTO_ADVANCE_STORAGE_KEY, String(checked));
  }, []);

  return { autoAdvance, handleAutoAdvanceChange, timeoutRef };
}
