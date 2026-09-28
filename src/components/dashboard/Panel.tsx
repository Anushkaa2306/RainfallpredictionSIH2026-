import type { ReactNode } from "react";

export function Panel({ title, detail, children, className = "" }: { title: string; detail?: string; children: ReactNode; className?: string }) {
  return <section className={`rounded-lg border border-border bg-card ${className}`}><header className="flex items-center justify-between border-b border-border px-4 py-3"><div><h2 className="font-display text-sm font-semibold">{title}</h2>{detail && <p className="mt-0.5 text-[11px] text-muted-foreground">{detail}</p>}</div></header>{children}</section>;
}