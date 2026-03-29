"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";


export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="placeholder-state">
      <Card>
        <AlertTriangle size={36} style={{ color: "var(--accent-coral)" }} />
        <h2>Something interrupted the studio</h2>
        <p className="muted">The dashboard could not load its current backend state.</p>
        <div className="tag-row" style={{ justifyContent: "center" }}>
          <Button onClick={() => reset()}>Try again</Button>
          <Link href="/roadmap">
            <Button variant="secondary">Open roadmap</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
