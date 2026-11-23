"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "@/components/brand/Icons";

export function CopyPlusCode({ code }: { code: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(code); setDone(true); setTimeout(() => setDone(false), 2000); } catch { /* clipboard blocked: code stays visible */ }
      }}
      className="inline-flex items-center gap-2 rounded-full border border-espresso/20 px-4 py-2 text-sm text-espresso transition hover:bg-espresso hover:text-ivory"
      aria-label={`Copy plus code ${code}`}
    >
      {done ? <IconCheck width={16} height={16} /> : <IconCopy width={16} height={16} />}
      <span className="font-mono">{code}</span>
      <span className="sr-only" aria-live="polite">{done ? "Copied" : ""}</span>
    </button>
  );
}
