import type { ReactNode } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";


export default function BookLayout({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <aside className="shell__sidebar">
        <Link href="/Dashboard" className="brand">
          <span className="brand__icon">
            <BookOpen size={20} />
          </span>
          <span>
            <strong>ChronoWeave</strong>
            <small>AI roadmap studio</small>
          </span>
        </Link>
        <Sidebar />
      </aside>

      <main className="shell__main">
        <Navbar />
        <div className="page-panel">{children}</div>
      </main>
    </div>
  );
}
