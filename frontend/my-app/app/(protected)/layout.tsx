import type { ReactNode } from "react";

import BookLayout from "@/components/layout/BookLayout";


export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <BookLayout>{children}</BookLayout>;
}
