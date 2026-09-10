import { Link } from "@tanstack/react-router";
import { ChevronUp, Copy, RotateCcw, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { formatMoney, quoteToText } from "@/lib/pricing";
import { useQuote } from "@/lib/quote-context";
import { cn } from "@/lib/utils";

export function EstimateBar() {
  const { quote, currency, selection, reset, shareUrl } = useQuote();
  const [open, setOpen] = useState(false);

  const copy = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(message);
    } catch {
      toast.error("Couldn't copy — long-press to select instead.");
    }
  };

  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto max-w-5xl px-3 pb-3">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface-strong/95 shadow-2xl backdrop-blur">
          {open ? (
            <div className="max-h-[45vh] overflow-y-auto border-b border-border px-4 py-3">
              {quote.isEmpty ? (
                <p className="text-sm text-muted-foreground">Nothing selected yet.</p>
              ) : (
                <ul className="space-y-2">
                  {quote.items.map((item, i) => (
                    <li key={i} className="flex items-start justify-between gap-3 text-sm">
                      <span className="min-w-0">
                        <span
                          className={cn("block", item.negative ? "text-primary" : "text-foreground")}
                        >
                          {item.label}
                        </span>
                        {item.detail ? (
                          <span className="block text-xs text-muted-foreground">{item.detail}</span>
                        ) : null}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 tabular-nums",
                          item.negative ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {formatMoney(item.low, currency)} – {formatMoney(item.high, currency)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => copy(quoteToText(selection, currency), "Quote copied")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs hover:bg-accent"
                >
                  <Copy className="size-3.5" aria-hidden /> Copy quote
                </button>
                <button
                  type="button"
                  onClick={() => copy(shareUrl(), "Shareable link copied")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs hover:bg-accent"
                >
                  <Share2 className="size-3.5" aria-hidden /> Copy link
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    toast.success("Quote cleared");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs hover:bg-accent"
                >
                  <RotateCcw className="size-3.5" aria-hidden /> Clear
                </button>
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="flex min-w-0 items-center gap-2 text-left"
            >
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Your estimate
                </span>
                <span className="block truncate text-base font-medium">
                  {quote.isEmpty
                    ? "Pick a package to get started"
                    : `${formatMoney(quote.low, currency)} – ${formatMoney(quote.high, currency)}`}
                </span>
              </span>
              <ChevronUp
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform",
                  open && "rotate-180",
                )}
                aria-hidden
              />
            </button>
            <Link
              to="/contact"
              className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Send this brief
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
