"use client";
import React, { useState } from "react";
import { Rnd } from "react-rnd";

type ResizableContainerProps = {
  initialWidth?: number | string;
  initialHeight?: number | string;
  initialX?: number;
  initialY?: number;
  children: React.ReactNode;
  onSave?: (data: { x: number; y: number; width: number | string; height: number | string }) => void;
};

export default function ResizableContainerForCharts({
  initialWidth,
  initialHeight,
  initialX,
  initialY,
  children,
  onSave,
}: ResizableContainerProps) {
  // Initial state for position and size (or you can fetch this from props)
  const [position, setPosition] = useState({ x: initialX || 0, y: initialY || 0 });
  const [size, setSize] = useState({ width: initialWidth || 500, height: initialHeight || 400 });

  // Function to handle the resize or drag stop and save to database
  const handleSavePositionAndSize = (
    newPosition: {
      x: number;
      y: number;
    },
    newSize: {
      width: number | string;
      height: number | string;
    },
  ) => {
    setPosition({ x: newPosition.x, y: newPosition.y });
    setSize({ width: newSize.width, height: newSize.height });

    // Trigger the onSave callback (if provided) to save the data in the database
    if (onSave) {
      onSave({ ...newPosition, ...newSize });
    }
  };

  return (
    <Rnd
      className="h-full w-full"
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => handleSavePositionAndSize(d, size)}
      onResizeStop={(e, direction, ref, delta, newPosition) => {
        const newSize = { width: ref.style.width, height: ref.style.height };
        handleSavePositionAndSize(newPosition, newSize);
      }}
      bounds="parent" // Restrict movement within the parent element
    >
      <div className="h-full w-full rounded-lg border">{children}</div>
    </Rnd>
  );
}
