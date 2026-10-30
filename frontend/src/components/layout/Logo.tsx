import { cn } from "@/lib/utils";

/** Brand mark: same artwork as app/icon.svg, with a brighter green in dark mode. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8 shrink-0", className)}>
      <rect width="32" height="32" rx="8" className="fill-[#047857] dark:fill-[#10b981]" />
      <path
        d="M11 6.5h10a5 5 0 0 1 5 5v5.5a5 5 0 0 1-5 5h-7.5L8 26v-4.6A5 5 0 0 1 6 17v-5.5a5 5 0 0 1 5-5Z"
        fill="#fff"
      />
      <path
        d="M16 9.25c.55 2.95 1.3 3.7 4.25 4.25-2.95.55-3.7 1.3-4.25 4.25-.55-2.95-1.3-3.7-4.25-4.25 2.95-.55 3.7-1.3 4.25-4.25Z"
        className="fill-[#047857] dark:fill-[#10b981]"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-lg font-bold tracking-tight text-fg">
        UrduMate <span className="text-primary">AI</span>
      </span>
    </span>
  );
}
