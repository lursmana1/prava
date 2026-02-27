import { useCallback } from "react";

type UseExamRestartOptions = {
  onReset: () => void;
  onRestart?: () => void;
};

export function useExamRestart({ onReset, onRestart }: UseExamRestartOptions) {
  const handleRestart = useCallback(() => {
    onReset();
    onRestart?.();
  }, [onReset, onRestart]);

  return { handleRestart };
}
