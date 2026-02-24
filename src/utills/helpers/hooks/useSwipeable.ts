import { useCallback, useEffect, useRef, useState } from "react";
import { SWIPE_THRESHOLD } from "@/CONSTS/swipe";

type UseSwipeableOptions = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  disabled?: boolean;
};

function triggerSwipe(offset: number, onSwipeLeft?: () => void, onSwipeRight?: () => void) {
  if (offset > SWIPE_THRESHOLD) onSwipeRight?.();
  else if (offset < -SWIPE_THRESHOLD) onSwipeLeft?.();
}

export function useSwipeable({
  onSwipeLeft,
  onSwipeRight,
  disabled = false,
}: UseSwipeableOptions) {
  const startX = useRef(0);
  const currentOffset = useRef(0);
  const isMouseDown = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;
      startX.current = e.touches[0].clientX;
      currentOffset.current = 0;
      setDragOffset(0);
    },
    [disabled],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;
      const diff = e.touches[0].clientX - startX.current;
      currentOffset.current = diff;
      setDragOffset(diff);
    },
    [disabled],
  );

  const handleTouchEnd = useCallback(() => {
    if (disabled) return;
    triggerSwipe(currentOffset.current, onSwipeLeft, onSwipeRight);
    setDragOffset(0);
  }, [disabled, onSwipeLeft, onSwipeRight]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      isMouseDown.current = true;
      startX.current = e.clientX;
      currentOffset.current = 0;
      setDragOffset(0);
    },
    [disabled],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !isMouseDown.current) return;
      const diff = e.clientX - startX.current;
      currentOffset.current = diff;
      setDragOffset(diff);
    },
    [disabled],
  );

  const handleMouseUp = useCallback(() => {
    if (disabled) return;
    isMouseDown.current = false;
    triggerSwipe(currentOffset.current, onSwipeLeft, onSwipeRight);
    setDragOffset(0);
  }, [disabled, onSwipeLeft, onSwipeRight]);

  useEffect(() => {
    const onDocMouseUp = () => {
      if (isMouseDown.current) {
        isMouseDown.current = false;
        triggerSwipe(currentOffset.current, onSwipeLeft, onSwipeRight);
        setDragOffset(0);
      }
    };
    document.addEventListener("mouseup", onDocMouseUp);
    return () => document.removeEventListener("mouseup", onDocMouseUp);
  }, [onSwipeLeft, onSwipeRight]);

  return {
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
    },
    dragOffset,
  };
}
