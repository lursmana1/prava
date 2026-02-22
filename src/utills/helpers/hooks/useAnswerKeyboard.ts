import { useEffect } from "react";

const ANSWER_KEYS = ["1", "2", "3", "4"];

const isInputFocused = () => {
  const target = document.activeElement as HTMLElement | null;
  const tag = target?.tagName?.toLowerCase();
  return tag === "input" || tag === "textarea" || !!target?.isContentEditable;
};

const useAnswerKeyboard = (
  disabled: boolean,
  answers: { key: string }[],
  onSelect: (key: string) => void,
) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isInputFocused() || disabled) return;

      const key = e.key;
      if (ANSWER_KEYS.includes(key) && answers.some((a) => a.key === key)) {
        e.preventDefault();
        onSelect(key);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [disabled, answers, onSelect]);
};

export default useAnswerKeyboard;
