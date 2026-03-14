"use client";
import React, { forwardRef } from "react";
interface RectangleProps {
  x: number;
  y: number;
  isSelected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Rectangle = forwardRef<HTMLDivElement, RectangleProps>(function Rectangle(
  props: RectangleProps,
  ref
) {
  const { x, y, isSelected, onClick } = props;

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`w-[50px] h-[30px] absolute transform translate-x-[-50%] translate-y-[-50%] rounded cursor-pointer transition-colors duration-200 ${isSelected ? "bg-indigo-300" : "bg-indigo-500"
        } hover:bg-indigo-400`}
      style={{ top: y, left: x }}
    />
  );
});

// Use React.memo for performance optimization
export default React.memo(Rectangle);
