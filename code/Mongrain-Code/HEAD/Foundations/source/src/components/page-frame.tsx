import type { ReactNode } from "react";
import { Link } from "wouter";
import { TITLE } from "@/lib/layers";

export function PageFrame({ children, alt, altLabel, right }: { children: ReactNode; alt: string; altLabel: string; right?: ReactNode }) {
  return (
    <div className="h-[100dvh] w-full flex flex-col overflow-hidden text-foreground" style={{ background: "hsl(40 20% 98.5%)" }}>
      <header className="shrink-0 px-4 sm:px-8 pt-4 sm:pt-6">
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 pb-3 border-b" style={{ borderColor: "hsl(215 14% 84%)" }}>
          <h1 data-testid="text-title" className="font-sans font-semibold tracking-[-0.025em] leading-[1.05] text-[clamp(1.25rem,3.2vw,2.6rem)]" style={{ color: "hsl(215 28% 9%)" }}>
            {TITLE}
          </h1>
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 pb-1 ml-auto">
            {right}
            <Link href={alt} data-testid="link-alt-version" className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-primary transition-colors">
              {altLabel}
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 min-h-0 relative">{children}</main>
    </div>
  );
}
