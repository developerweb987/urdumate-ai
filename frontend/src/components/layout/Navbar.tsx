"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { TOOLS, TOOL_GROUPS } from "@/lib/tools";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu whenever the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/85 backdrop-blur-md supports-[backdrop-filter]:bg-surface/75">
      <nav aria-label="Main" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" onClick={closeMenu} className="-m-1 rounded-lg p-1" aria-label="UrduMate AI home">
            <Logo />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {TOOLS.map((tool) => {
              const active = pathname === tool.href;
              return (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-2.5 py-2 text-sm font-medium transition-colors xl:px-3",
                      active ? "bg-primary-soft text-primary-soft-fg" : "text-muted hover:bg-surface-2 hover:text-fg"
                    )}
                  >
                    {tool.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="flex size-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg lg:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile / tablet menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-x-0 top-16 bottom-0 z-40 bg-fg/20 animate-fade-in lg:hidden"
            onClick={closeMenu}
            aria-hidden
          />
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-surface shadow-raised animate-slide-down lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-6 px-4 py-5 sm:grid-cols-3 sm:px-6">
              {TOOL_GROUPS.map((group) => (
                <div key={group.name}>
                  <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-subtle">{group.name}</p>
                  <ul className="flex flex-col gap-0.5">
                    {TOOLS.filter((t) => t.group === group.name).map((tool) => {
                      const Icon = tool.icon;
                      const active = pathname === tool.href;
                      return (
                        <li key={tool.href}>
                          <Link
                            href={tool.href}
                            onClick={closeMenu}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-[15px] font-medium transition-colors",
                              active ? "bg-primary-soft text-primary-soft-fg" : "text-fg hover:bg-surface-2"
                            )}
                          >
                            <Icon aria-hidden className={cn("size-4.5", active ? "text-primary" : "text-subtle")} />
                            {tool.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
