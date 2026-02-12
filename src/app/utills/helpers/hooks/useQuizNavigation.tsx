// useQuestionNavigation.ts
import { useCallback, useState } from "react";

export function useQuestionNavigation(total: number, disabled: boolean) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const prev = useCallback(() => {
    if (disabled) return;
    setDirection("prev");
    setIndex((i) => (i > 0 ? i - 1 : total - 1));
  }, [disabled, total]);

  const next = useCallback(() => {
    if (disabled) return;
    setDirection("next");
    setIndex((i) => (i + 1) % total);
  }, [disabled, total]);

  const reset = useCallback(() => {
    setIndex(0);
    setDirection("next");
  }, []);

  return { index, direction, prev, next, reset };
}
