"use client";
import React from "react";
import Link from "./Link";
import type { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";

interface NavigationLinkProps
  extends Omit<LinkProps, "href">,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: LinkProps["href"];
  onClick?: () => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  href,
  children,
  onClick,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 如果有onClick处理函数，先执行它
    if (onClick) {
      onClick();
    }
  };

  // 直接使用Link组件进行导航，让全局LoadingContext处理页面加载状态
  return (
    <Link href={href as string} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
};

export default NavigationLink;
