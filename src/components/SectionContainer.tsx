import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="site-wrapper relative mx-auto max-w-3xl bg-white px-6 sm:px-8 xl:max-w-5xl dark:bg-gray-800">
      {children}
    </section>
  );
}
