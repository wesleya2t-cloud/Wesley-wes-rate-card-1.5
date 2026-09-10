import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy, Mail } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatMoney, quoteToText } from "@/lib/pricing";
import { useQuote } from "@/lib/quote-context";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Start a project — Wesley Wes Creates" },
      {
        name: "description",
        content:
          "Send a two-minute brief with your quote attached. Podcast production and social media management, Nairobi-based.",
      },
      { property: "og:title", content: "Start a project — Wesley Wes Creates" },
      {
        property: "og:description",
        content: "Two minutes of questions and your quote comes attached. Reply within one working day.",
      },
    ],
  }),
  component: ContactPage,
});

const EMAIL = "handywesley@gmail.com";

const SERVICES = ["Podcast production", "Social media", "Both", "Something else"] as const;
const TIMELINES = ["This week", "This month", "Next month", "Just exploring"] as const;

function ContactPage() {
  const { selection, quote, currency, shareUrl } = useQuote();
  const [name, setName] = useState("");
  const [show, setShow] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState<string>(SERVICES[0]);
  const [timeline, setTimeline] = useState<string>(TIMELINES[1]);
  const [message, setMessage] = useState("");

  const body = useMemo(() => {
    const lines = [
      `Name: ${name || "-"}`,
      `Show / brand: ${show || "-"}`,
      `Best way to reach me: ${contact || "-"}`,
      `Looking for: ${service}`,
      `Timeline: ${timeline}`,
      "",
      "Notes:",
      message || "-",
      "",
      "My quote:",
      quoteToText(selection, currency),
      "",
      `Quote link: ${shareUrl()}`,
    ];
    return lines.join("\n");
  }, [name, show, contact, service, timeline, message, selection, currency, shareUrl]);

  const subject = `Project brief — ${show || name || "new enquiry"}`;
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${body}`);
      toast.success("Brief copied — paste it anywhere");
    } catch {
      toast.error("Couldn't copy — select the text instead.");
    }
  };

  const field =
    "w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary";

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-5 py-12">
        <p className="text-[11px] uppercase tracking-[0.24em] text-primary">Start a project</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Tell me what you're building.</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Two minutes of questions. Your quote comes attached automatically, and I reply within one
          working day.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailto;
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Your name
                </span>
                <input
                  className={field}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Wanjiku"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Show or brand
                </span>
                <input
                  className={field}
                  value={show}
                  onChange={(e) => setShow(e.target.value)}
                  placeholder="The Morning Clinic"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Email or WhatsApp number
              </span>
              <input
                className={field}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="jane@email.com or +254…"
                required
              />
            </label>

            <fieldset>
              <legend className="mb-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                What do you need?
              </legend>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setService(s)}
                    aria-pressed={service === s}
                    className={`rounded-full border px-3.5 py-1.5 text-sm ${
                      service === s
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-accent"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-1.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                When do you want to start?
              </legend>
              <div className="flex flex-wrap gap-2">
                {TIMELINES.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTimeline(t)}
                    aria-pressed={timeline === t}
                    className={`rounded-full border px-3.5 py-1.5 text-sm ${
                      timeline === t
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-accent"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Anything else
              </span>
              <textarea
                className={`${field} min-h-28 resize-y`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Episode length, how often you record, what's been frustrating so far…"
              />
            </label>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
              >
                <Mail className="size-4" aria-hidden /> Send by email
              </button>
              <button
                type="button"
                onClick={copyBrief}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:bg-accent"
              >
                <Copy className="size-4" aria-hidden /> Copy the brief
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Sending opens your email app with everything filled in, addressed to {EMAIL}. Prefer
              WhatsApp? Copy the brief and paste it there.
            </p>
          </form>

          <aside className="h-fit rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24">
            <h2 className="font-display text-xl">Your quote</h2>
            {quote.isEmpty ? (
              <>
                <p className="mt-2 text-sm text-muted-foreground">
                  You haven't picked any packages yet — that's fine, send the brief anyway and I'll
                  suggest one.
                </p>
                <Link
                  to="/"
                  className="mt-4 inline-block rounded-full border border-border px-4 py-2 text-sm hover:bg-accent"
                >
                  Build a quote
                </Link>
              </>
            ) : (
              <>
                <ul className="mt-3 space-y-2">
                  {quote.items.map((item, i) => (
                    <li key={i} className="flex items-start justify-between gap-3 text-sm">
                      <span className="min-w-0">
                        <span className="block">{item.label}</span>
                        {item.detail ? (
                          <span className="block text-xs text-muted-foreground">{item.detail}</span>
                        ) : null}
                      </span>
                      <span className="shrink-0 tabular-nums text-muted-foreground">
                        {formatMoney(item.low, currency)} – {formatMoney(item.high, currency)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-border pt-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    Estimated total
                  </p>
                  <p className="mt-1 font-display text-2xl">
                    {formatMoney(quote.low, currency)} – {formatMoney(quote.high, currency)}
                  </p>
                </div>
                <Link
                  to="/"
                  className="mt-4 inline-block text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Change packages
                </Link>
              </>
            )}
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
