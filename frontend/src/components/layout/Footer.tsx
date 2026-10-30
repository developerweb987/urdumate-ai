import Link from "next/link";
import { TOOLS, TOOL_GROUPS } from "@/lib/tools";
import { Logo } from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_2fr] lg:px-8">
        <div className="max-w-sm">
          <Link href="/" className="inline-block rounded-lg" aria-label="UrduMate AI home">
            <Logo />
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Free writing and translation tools for English, Urdu, and Roman Urdu. No account needed.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {TOOL_GROUPS.map((group) => (
            <div key={group.name}>
              <p className="text-sm font-semibold text-fg">{group.name}</p>
              <ul className="mt-3 space-y-2.5">
                {TOOLS.filter((t) => t.group === group.name).map((tool) => (
                  <li key={tool.href}>
                    <Link href={tool.href} className="rounded text-sm text-muted transition-colors hover:text-primary">
                      {tool.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-subtle sm:px-6 lg:px-8">
          © 2026 UrduMate AI. Built for Pakistan.
        </p>
      </div>
    </footer>
  );
}
