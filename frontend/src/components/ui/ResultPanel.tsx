"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { FileText } from "lucide-react";
import { countWords } from "@/lib/clipboard";
import { cn } from "@/lib/utils";
import { CopyButton, DownloadButton } from "./ActionButtons";
import { cardClass } from "./PageHeader";

/**
 * Read-only output panel with copy/download actions, an empty state, and
 * word/character counts. On small screens it scrolls itself into view when a
 * new result arrives, since it sits below the form.
 */
export function ResultPanel({
  title,
  value,
  emptyTitle,
  emptyHint,
  filename,
  copyLabel,
  footer,
  className,
  minHeight = "min-h-[320px]",
}: {
  title: string;
  value: string;
  emptyTitle: string;
  emptyHint: string;
  filename: string;
  copyLabel?: string;
  footer?: ReactNode;
  className?: string;
  minHeight?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const headingId = `${filename.replace(/\W/g, "")}-heading`;

  useEffect(() => {
    if (!value || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (rect.top > window.innerHeight - 120 || rect.bottom < 0) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      ref.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }, [value]);

  return (
    <section ref={ref} aria-labelledby={headingId} className={cn(cardClass, "flex flex-col scroll-mt-20", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3">
        <h2 id={headingId} className="text-sm font-semibold text-fg">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <CopyButton text={value} label={copyLabel} />
          <DownloadButton text={value} filename={filename} iconOnly />
        </div>
      </div>

      <div className={cn("relative flex flex-1 flex-col p-2", minHeight)}>
        {value ? (
          <textarea
            readOnly
            value={value}
            aria-labelledby={headingId}
            className="flex-1 resize-none rounded-lg bg-transparent px-3 py-2.5 text-[15px] leading-relaxed text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 animate-fade-in"
          />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-10 text-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-surface-2 text-subtle">
              <FileText aria-hidden className="size-5" />
            </div>
            <p className="text-sm font-medium text-fg">{emptyTitle}</p>
            <p className="max-w-xs text-sm text-muted">{emptyHint}</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-5 py-2.5 text-xs text-subtle">
        <span>{footer}</span>
        <span className="tabular-nums">
          {countWords(value)} words · {value.length} characters
        </span>
      </div>
    </section>
  );
}
