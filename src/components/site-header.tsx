import { Link } from "@tanstack/react-router";

import { CurrencyToggle } from "./currency-toggle";

const links = [
  { to: "/", label: "Rate card" },
  { to: "/work", label: "Work" },
  { to: "/contact", label: "Start a project" },
] as const;

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3">
        <Link to="/" className="min-w-0">
          <span className="block truncate font-display text-lg leading-tight">Wesley Wes</span>
          <span className="block truncate text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Rate card 2026
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <nav className="hidden items-center gap-1 sm:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <CurrencyToggle />
        </div>
      </div>
    </header>
  );
}
