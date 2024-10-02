"use client";
import React, { ReactNode, useEffect, useRef } from "react";

export default function Wrapper({ children, width, height }: { children: ReactNode; width: number; height: number }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.width = `${width}px`;
      wrapperRef.current.style.height = `${height}px`;
    }
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
