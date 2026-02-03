"use client";
import React, { useState, useEffect } from "react";
import { ReactSVG, type Props } from "react-svg";

export type ReactSvgClientProps = Omit<Props, "ref">;

export const ReactSvgClient = (props: ReactSvgClientProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <ReactSVG {...props} />;
};
