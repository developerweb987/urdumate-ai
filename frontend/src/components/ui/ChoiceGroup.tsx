import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Choice<T extends string> {
  value: T;
  label: string;
  desc?: string;
  icon?: LucideIcon;
}

/**
 * Accessible single-select built on native radio inputs, so arrow-key
 * navigation and screen reader semantics come for free.
 */
export function ChoiceGroup<T extends string>({
  legend,
  name,
  value,
  onChange,
  choices,
  columns = 2,
  className,
}: {
  legend: string;
  name: string;
  value: T;
  onChange: (value: T) => void;
  choices: Choice<T>[];
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <fieldset className={cn("flex flex-col gap-1.5", className)}>
      <legend className="mb-1.5 text-sm font-medium text-fg">{legend}</legend>
      <div className={cn("grid gap-2", columns === 2 ? "grid-cols-1 min-[420px]:grid-cols-2" : "grid-cols-1")}>
        {choices.map((c) => {
          const Icon = c.icon;
          const checked = c.value === value;
          return (
            <label
              key={c.value}
              className={cn(
                "relative flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2.5 transition-colors duration-150",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
                checked
                  ? "border-primary bg-primary-soft"
                  : "border-border-strong bg-surface hover:bg-surface-2"
              )}
            >
              <input
                type="radio"
                name={name}
                value={c.value}
                checked={checked}
                onChange={() => onChange(c.value)}
                className="sr-only"
              />
              {Icon && (
                <Icon
                  aria-hidden
                  className={cn("mt-0.5 size-4 shrink-0", checked ? "text-primary" : "text-subtle")}
                />
              )}
              <span className="min-w-0">
                <span className={cn("block text-sm font-semibold", checked ? "text-primary-soft-fg" : "text-fg")}>
                  {c.label}
                </span>
                {c.desc && <span className="mt-0.5 block text-xs leading-snug text-muted">{c.desc}</span>}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
