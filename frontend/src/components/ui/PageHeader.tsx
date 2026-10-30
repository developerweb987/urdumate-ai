import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:mb-8 md:flex-row md:items-end md:justify-between">
      <div className="flex items-start gap-3.5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Icon aria-hidden className="size-5.5" />
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-[1.75rem]">{title}</h1>
          <p className="mt-1 max-w-2xl text-[15px] leading-relaxed text-muted">{description}</p>
        </div>
      </div>
      {children}
    </header>
  );
}

/** Standard page container for tool pages. */
export function ToolPage({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className={`mx-auto w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-8 ${wide ? "max-w-6xl" : "max-w-5xl"}`}>
      {children}
    </div>
  );
}

/** Card surface used for panels. */
export const cardClass = "rounded-2xl border border-border bg-surface shadow-card";
