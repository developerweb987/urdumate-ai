import type { ReactNode } from "react";
import { AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Alert({
  tone = "error",
  title,
  children,
  onDismiss,
  action,
  className,
}: {
  tone?: "error" | "info";
  title?: string;
  children: ReactNode;
  onDismiss?: () => void;
  action?: ReactNode;
  className?: string;
}) {
  const Icon = tone === "error" ? AlertCircle : Info;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3 text-sm animate-slide-down",
        tone === "error"
          ? "border-danger/30 bg-danger-soft text-fg"
          : "border-primary/25 bg-primary-soft text-fg",
        className
      )}
    >
      <Icon aria-hidden className={cn("mt-0.5 size-4 shrink-0", tone === "error" ? "text-danger" : "text-primary")} />
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className="text-muted">{children}</div>
        {action && <div className="mt-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss message"
          className="-m-1 rounded-md p-1 text-subtle hover:bg-surface-2 hover:text-fg"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
