"use client";
import Rectangle from "@/components/Rectangle";
import styles from "./style.module.css";
import React from "react";

type ChildrenBorders = {
  borderX: { left: number; right: number };
  borderY: { top: number; bottom: number };
}[];

function Page() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);
  const isDraggingRef = React.useRef(false);

  const [childrenBorders, setChildrenBorders] = React.useState<ChildrenBorders>([]);
  const [childrenPositions, setChildrenPositions] = React.useState<{ x: number; y: number }[]>([
    { x: 100, y: 100 },
  ]);
  const [isSelected, setIsSelected] = React.useState(false);

  // Update borders when position changes
  React.useEffect(() => {
    if (childRef.current) {
      const rect = childRef.current.getBoundingClientRect();
      const scrollTop = document.documentElement.scrollTop;
      const scrollLeft = document.documentElement.scrollLeft;

      setChildrenBorders([
        {
          borderX: {
            left: rect.left + scrollLeft,
            right: rect.right + scrollLeft,
          },
          borderY: {
            top: rect.top + scrollTop,
            bottom: rect.bottom + scrollTop,
          },
        },
      ]);
    }
  }, [childrenPositions]);

  // Handle rectangle click to lighten color
  const handleRectangleClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsSelected((prev) => !prev);
    //console.log("Rectangle clicked");
  }, []);

  // Check if click is within rectangle bounds
  const isClickInRectangle = React.useCallback((clientX: number, clientY: number): boolean => {
    const border = childrenBorders[0];
    if (!border) return false;

    return (
      clientX >= border.borderX.left &&
      clientX <= border.borderX.right &&
      clientY >= border.borderY.top &&
      clientY <= border.borderY.bottom
    );
  }, [childrenBorders]);

  // Handle mouse down - move rectangle to clicked position
  const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { clientX, clientY } = e;

    //console.log("Map mouse down", clientX, clientY);

    // If clicking on rectangle, start dragging mode
    if (isClickInRectangle(clientX, clientY)) {
      isDraggingRef.current = true;
      //console.log("Start dragging rectangle");
    } else {
      // If clicking outside rectangle, move it to the clicked position
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const relativeX = clientX - containerRect.left;
        const relativeY = clientY - containerRect.top;

        setChildrenPositions([{ x: relativeX, y: relativeY }]);
        //console.log("Moved rectangle to:", relativeX, relativeY);
      }
    }
  }, [isClickInRectangle]);

  // Handle mouse move - for dragging
  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    e.preventDefault();
    const { clientX, clientY } = e;

    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const relativeX = clientX - containerRect.left;
      const relativeY = clientY - containerRect.top;

      // Use requestAnimationFrame for smooth performance
      requestAnimationFrame(() => {
        setChildrenPositions([{ x: relativeX, y: relativeY }]);
      });
    }
  }, []);

  // Handle mouse up - stop dragging
  const handleMouseUp = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      //console.log("Stop dragging rectangle");
    }
  }, []);

  return (
    <div
      className={`h-[75vh] bg-red-100 overflow-scroll dark:bg-red-900 ${styles.customScroll} flex relative`}
    >
      <div className="basis-[10%]">sidebars</div>
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="cursor-pointer relative basis-[90%] bg-green-100 dark:bg-green-900"
      >
        <Rectangle
          ref={childRef}
          x={childrenPositions[0].x}
          y={childrenPositions[0].y}
          isSelected={isSelected}
          onClick={handleRectangleClick}
        />
      </div>
    </div>
  );
}

export default Page;
