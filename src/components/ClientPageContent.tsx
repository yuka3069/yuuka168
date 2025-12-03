"use client";

import { Suspense } from "react";
import SkeletonMain from "./skeleton/SkeletonMain";

interface ClientPageContentProps {
  children: React.ReactNode;
}

const ClientPageContent: React.FC<ClientPageContentProps> = ({ children }) => {
  return (
    <>
      <Suspense fallback={<SkeletonMain />}>
        <main className="mb-auto">{children}</main>
      </Suspense>
    </>
  );
};

export default ClientPageContent;
