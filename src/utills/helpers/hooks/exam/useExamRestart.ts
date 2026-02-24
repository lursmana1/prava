import { useCallback, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";

type UseExamRestartOptions = {
  onReset: () => void;
};

export function useExamRestart({ onReset }: UseExamRestartOptions) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const onResetRef = useRef(onReset);
  onResetRef.current = onReset;

  const handleRestart = useCallback(() => {
    onResetRef.current?.();
    startTransition(() => router.refresh());
  }, [router]);

  return { handleRestart, isPending };
}
