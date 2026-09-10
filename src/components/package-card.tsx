import { Check, Minus, Plus } from "lucide-react";

import { formatMoney, type Currency, type Tier } from "@/lib/pricing";
import { cn } from "@/lib/utils";

type Props = {
  tier: Tier;
  currency: Currency;
  selected: boolean;
  onSelect: () => void;
  episodes?: number;
  onEpisodes?: (n: number) => void;
  popular?: boolean;
};

export function PackageCard({
  tier,
  currency,
  selected,
  onSelect,
  episodes,
  onEpisodes,
  popular,
}: Props) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-card p-5 transition-all",
        selected
          ? "border-primary shadow-[0_0_0_1px_var(--primary)]"
          : "border-border hover:border-foreground/30",
      )}
    >
      {popular ? (
        <span className="absolute -top-2.5 left-5 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
          Most booked
        </span>
      ) : null}

      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className="text-left focus-visible:outline-none"
      >
        <h3 className="font-display text-2xl leading-tight">{tier.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{tier.blurb}</p>
        <p className="mt-4 text-lg font-medium">
          {formatMoney(tier.low, currency)} – {formatMoney(tier.high, currency)}
          <span className="ml-1 text-sm text-muted-foreground">/ {tier.unit}</span>
        </p>
      </button>

      <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
        {tier.includes.map((item) => (
          <li key={item} className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex-1" />

      {selected && onEpisodes ? (
        <div className="mb-3 flex items-center justify-between rounded-xl border border-border bg-secondary px-3 py-2">
          <span className="text-sm text-muted-foreground">Episodes / month</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Fewer episodes"
              onClick={() => onEpisodes((episodes ?? 1) - 1)}
              className="grid size-7 place-items-center rounded-full border border-border hover:bg-accent"
            >
              <Minus className="size-3.5" aria-hidden />
            </button>
            <span aria-live="polite" className="w-6 text-center text-sm font-medium">
              {episodes ?? 1}
            </span>
            <button
              type="button"
              aria-label="More episodes"
              onClick={() => onEpisodes((episodes ?? 1) + 1)}
              className="grid size-7 place-items-center rounded-full border border-border hover:bg-accent"
            >
              <Plus className="size-3.5" aria-hidden />
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          "w-full rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
          selected
            ? "bg-primary text-primary-foreground"
            : "border border-border text-foreground hover:bg-accent",
        )}
      >
        {selected ? "Added to quote" : "Add to quote"}
      </button>
    </div>
  );
}
