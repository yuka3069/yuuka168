"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

// 创建LoadingContext接口
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// 创建LoadingContext
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// LoadingProvider组件接口
interface LoadingProviderProps {
  children: ReactNode;
}

// 创建LoadingProvider组件
export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  // 使用useEffect来监听路径变化，在路径变化时设置加载状态
  useEffect(() => {
    // 路径变化开始时设置为true
    setIsLoading(true);

    // 在App Router中，当pathname改变时，我们假设导航已完成
    // 直接设置isLoading为false
    setIsLoading(false);

    // 注意：在实际应用中，如果您需要更精确的加载状态控制，
    // 您可能需要结合数据获取状态来设置isLoading
  }, []); // 依赖项包含pathname，当路径变化时重新执行

  // 提供加载状态和设置函数
  const value = {
    isLoading,
    setIsLoading,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

// 自定义hook来使用LoadingContext
export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
