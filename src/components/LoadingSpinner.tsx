"use client";

import React from "react";

// LoadingSpinner组件接口
interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

// 定义不同尺寸的样式
const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
  lg: "h-16 w-16",
};

// LoadingSpinner组件
export default function LoadingSpinner({
  className = "",
  size = "md",
  fullScreen = false,
}: LoadingSpinnerProps) {
  // 基础spinner样式
  const spinnerClasses = `animate-spin rounded-full border-t-primary-500 border-solid ${sizeClasses[size]} ${className}`;

  // 根据dark/light模式设置不同的边框颜色
  const borderClasses = "dark:border-gray-700 border-gray-200";

  // 全屏容器样式
  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-950/80 z-50"
    : "";

  return (
    <div className={containerClasses}>
      <div className={`${spinnerClasses} ${borderClasses}`}>
        <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-500 dark:border-t-primary-400 rounded-full animate-spin mb-4"></div>
      </div>
    </div>
  );
}
