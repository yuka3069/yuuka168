import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  withWrapperBg?: boolean;
}

export default function SectionContainer({
  children,
  withWrapperBg = true,
}: Props) {
  const className = withWrapperBg
    ? "site-wrapper relative mx-auto max-w-3xl bg-white px-6 sm:px-8 xl:max-w-5xl dark:bg-gray-800"
    : "mx-auto max-w-3xl bg-white px-6 sm:px-8 xl:max-w-5xl dark:bg-gray-950";

  return (
    <section className={className}>{children}</section>
  );
}
