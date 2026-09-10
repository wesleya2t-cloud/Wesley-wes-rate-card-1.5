import { useQuote } from "@/lib/quote-context";
import { cn } from "@/lib/utils";

export function CurrencyToggle({ className }: { className?: string }) {
  const { currency, setCurrency } = useQuote();
  return (
    <div
      role="group"
      aria-label="Currency"
      className={cn(
        "flex shrink-0 items-center rounded-full border border-border bg-secondary p-0.5",
        className,
      )}
    >
      {(["KES", "USD"] as const).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setCurrency(c)}
          aria-pressed={currency === c}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-colors",
            currency === c
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
