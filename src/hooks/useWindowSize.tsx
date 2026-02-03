import { useState, useEffect } from "react";

interface WindowTypes {
  width?: number;
  height?: number;
  loaded: boolean;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowTypes>({
    width: undefined,
    height: undefined,
    loaded: false,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        loaded: true,
      });
    }

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
