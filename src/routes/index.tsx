import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";

import { EstimateBar } from "@/components/estimate-bar";
import { PackageCard } from "@/components/package-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ADDONS, PODCAST_TIERS, SOCIAL_TIERS, formatMoney } from "@/lib/pricing";
import { useQuote } from "@/lib/quote-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wesley Wes Creates — Podcast & Social Rate Card 2026" },
      {
        name: "description",
        content:
          "Podcast production from KES 3,500 an episode and social media management from KES 15,000 a month. Build your quote in under a minute.",
      },
      { property: "og:title", content: "Rate card 2026 — Wesley Wes Creates" },
      {
        property: "og:description",
        content:
          "Transparent podcast and social media packages with an instant quote builder and a two-minute brief.",
      },
    ],
  }),
  component: Index,
});

const FAQ = [
  {
    q: "How long does an episode take to come back?",
    a: "Standard turnaround is 3-4 working days from the moment I have the raw files. Rush turnaround gets it back in under 48 hours for 20% more.",
  },
  {
    q: "What do you need from me to start?",
    a: "The raw audio or video, any intro/outro assets, and a sentence on the tone you want. For social, access to the accounts and whatever brand material already exists.",
  },
  {
    q: "How many revisions are included?",
    a: "One full round on every package, and small fixes after that are on me. Bigger re-cuts are quoted separately so nobody's guessing.",
  },
  {
    q: "Is the estimate the final price?",
    a: "It's a range, not an invoice. Where you land inside it depends on episode length, recording quality and how much cleanup is involved. We confirm on a 15-minute call.",
  },
  {
    q: "How does payment work?",
    a: "50% deposit to begin, balance on delivery. Retainers are billed at the start of each month. M-Pesa or bank transfer.",
  },
];

const STEPS = [
  { n: "01", t: "Build your quote", d: "Tap the packages that fit. The total updates as you go." },
  { n: "02", t: "Send the brief", d: "Two minutes of questions — it arrives with your quote attached." },
  { n: "03", t: "15-minute call", d: "We confirm scope and price, then set a delivery rhythm." },
];

function Index() {
  const { selection, currency, quote, selectPodcast, setEpisodes, selectSocial, toggleAddon } =
    useQuote();

  return (
    <div className="min-h-screen pb-28">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-5">
        {/* Hero */}
        <section className="grain-panel -mx-5 px-5 pb-12 pt-14 sm:pt-20">
          <p className="text-[11px] uppercase tracking-[0.24em] text-primary">Rate card — 2026</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-7xl">
            Wesley Wes
            <br />
            Creates.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Podcast production and social media management for people who have something worth
            saying — and want it to sound and look like it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#podcast"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Build your quote <ArrowRight className="size-4" aria-hidden />
            </a>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:bg-accent"
            >
              See recent work
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
            {[
              ["Turnaround", "3-4 days"],
              ["Revisions", "1 round included"],
              ["Deposit", "50% to start"],
              ["Based in", "Nairobi, remote-friendly"],
            ].map(([k, v]) => (
              <div key={k} className="min-w-0">
                <dt className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {k}
                </dt>
                <dd className="mt-1 truncate text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* How it works */}
        <section className="border-t border-border py-12">
          <div className="grid gap-6 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="min-w-0">
                <span className="font-display text-sm text-primary">{s.n}</span>
                <h2 className="mt-1 font-display text-xl">{s.t}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Podcast */}
        <section id="podcast" className="border-t border-border py-12">
          <header className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary">Priced per episode</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Podcast production</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              From raw recordings to something you'd hand to a stranger and not flinch. Pick the
              tier that matches how much of the process you want off your plate.
            </p>
          </header>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PODCAST_TIERS.map((tier) => (
              <PackageCard
                key={tier.id}
                tier={tier}
                currency={currency}
                selected={selection.podcast === tier.id}
                onSelect={() => selectPodcast(tier.id)}
                episodes={selection.episodes}
                onEpisodes={setEpisodes}
                popular={tier.id === "full"}
              />
            ))}
          </div>

          <p
            className={cn(
              "mt-4 rounded-xl border px-4 py-3 text-sm",
              quote.retainerApplied
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border text-muted-foreground",
            )}
          >
            <Sparkles className="mr-2 inline size-4 text-primary" aria-hidden />
            <span className="text-foreground">Monthly retainer:</span> book 4 or more episodes a
            month on any tier and 12% comes off automatically.
            {quote.retainerApplied ? " Applied." : ""}
          </p>
        </section>

        {/* Social */}
        <section id="social" className="border-t border-border py-12">
          <header className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary">Priced monthly</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Social media &amp; marketing</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A consistent presence without you having to think about it daily. Calendars, posting
              and reporting, scaled to how much ground you want covered.
            </p>
          </header>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {SOCIAL_TIERS.map((tier) => (
              <PackageCard
                key={tier.id}
                tier={tier}
                currency={currency}
                selected={selection.social === tier.id}
                onSelect={() => selectSocial(tier.id)}
                popular={tier.id === "growth"}
              />
            ))}
          </div>

          <p
            className={cn(
              "mt-4 rounded-xl border px-4 py-3 text-sm",
              quote.bundleApplied
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border text-muted-foreground",
            )}
          >
            <Sparkles className="mr-2 inline size-4 text-primary" aria-hidden />
            <span className="text-foreground">Bundle:</span> take a podcast package alongside social
            media and an extra 5% comes off both.
            {quote.bundleApplied ? " Applied." : ""}
          </p>
        </section>

        {/* Add-ons */}
        <section id="addons" className="border-t border-border py-12">
          <h2 className="font-display text-3xl sm:text-4xl">Add-ons</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Bolt any of these onto a package. Tap to add — they show up in your estimate instantly.
          </p>

          <ul className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {ADDONS.map((addon) => {
              const active = selection.addons.includes(addon.id);
              const blocked = Boolean(addon.percentOfPodcast) && !selection.podcast;
              return (
                <li key={addon.id}>
                  <button
                    type="button"
                    disabled={blocked}
                    aria-pressed={active}
                    onClick={() => toggleAddon(addon.id)}
                    className={cn(
                      "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 text-left transition-colors",
                      blocked ? "cursor-not-allowed opacity-50" : "hover:bg-accent",
                      active && "bg-primary/10",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-5 shrink-0 place-items-center rounded-md border",
                        active ? "border-primary bg-primary" : "border-border",
                      )}
                    >
                      {active ? (
                        <Check className="size-3.5 text-primary-foreground" aria-hidden />
                      ) : null}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm">{addon.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {blocked ? "Select a podcast package first" : addon.note}
                      </span>
                    </span>
                    <span className="shrink-0 text-right text-sm tabular-nums text-muted-foreground">
                      {addon.percentOfPodcast
                        ? "+20%"
                        : `${formatMoney(addon.low, currency)} – ${formatMoney(addon.high, currency)}`}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-border py-12">
          <h2 className="font-display text-3xl sm:text-4xl">Before you ask</h2>
          <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {FAQ.map((f) => (
              <details key={f.q} className="group px-4 py-4">
                <summary className="cursor-pointer list-none text-sm font-medium marker:hidden">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border py-14 text-center">
          <h2 className="font-display text-3xl sm:text-4xl">Nothing above fits exactly?</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            Every show is different. Tell me what you're building and I'll put a package together
            for it.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Start a project <ArrowRight className="size-4" aria-hidden />
          </Link>
        </section>
      </main>

      <SiteFooter />
      <EstimateBar />
    </div>
  );
}
