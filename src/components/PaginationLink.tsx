import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "./Link";
import LoadingSpinner from "./LoadingSpinner";

interface PaginationLinkProps {
  href: string;
  children: React.ReactNode;
  rel?: string;
}

/**
 * 分页链接组件，添加点击时的loading状态
 */
const PaginationLink: React.FC<PaginationLinkProps> = ({
  href,
  children,
  rel,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 防止默认的链接跳转行为
    e.preventDefault();

    // 设置loading状态
    setIsLoading(true);

    // 使用router.push进行页面跳转
    // Next.js会在页面跳转完成后自动更新DOM
    router.push(href);

    // 为了防止意外情况，设置一个超时来重置loading状态
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  if (isLoading) {
    // 显示loading状态
    return (
      <button
        className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300"
        disabled
      >
        <LoadingSpinner />
      </button>
    );
  }

  return (
    <Link
      href={href}
      rel={rel}
      onClick={handleClick}
      className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300"
    >
      {children}
    </Link>
  );
};

export default PaginationLink;
