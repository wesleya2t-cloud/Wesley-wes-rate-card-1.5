import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";
import { useState } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Recent work — Wesley Wes Creates" },
      {
        name: "description",
        content:
          "A sample episode, social campaigns and a design portfolio from podcast and social work produced by Wesley Wes.",
      },
      { property: "og:title", content: "Recent work — Wesley Wes Creates" },
      {
        property: "og:description",
        content: "Podcast episodes, social campaigns and design work, in one place.",
      },
    ],
  }),
  component: WorkPage,
});

const YT_ID = "7cVgFu7wgt0";

function WorkPage() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-5 py-12">
        <p className="text-[11px] uppercase tracking-[0.24em] text-primary">Recent work</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">A few things I've made.</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Episodes produced end to end, social accounts run day to day, and design work that keeps a
          show recognisable across platforms.
        </p>

        {/* Podcast */}
        <section className="mt-12">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
            <h2 className="min-w-0 truncate font-display text-2xl">Business Clinics</h2>
            <span className="shrink-0 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Podcast
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Full production: edit, show notes and publishing. Sample episode below.
          </p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative aspect-video w-full bg-secondary">
              {playing ? (
                <iframe
                  className="absolute inset-0 size-full"
                  src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0`}
                  title="Business Clinics — sample episode"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 size-full"
                  aria-label="Play the sample episode"
                >
                  <img
                    src={`https://i.ytimg.com/vi/${YT_ID}/hqdefault.jpg`}
                    alt="Business Clinics podcast episode thumbnail"
                    loading="lazy"
                    className="size-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                  />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid size-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl">
                      <Play className="size-6 translate-x-0.5 fill-current" aria-hidden />
                    </span>
                  </span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
              <p className="min-w-0 truncate text-sm">Episode sample — long-form interview</p>
              <a
                href={`https://www.youtube.com/watch?v=${YT_ID}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                YouTube <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </section>

        {/* Social + design */}
        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <article className="flex flex-col rounded-2xl border border-border bg-card p-5">
            <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Social media
            </span>
            <h2 className="mt-2 font-display text-2xl">Elite K9 &amp; Animal Care</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              Ongoing Instagram management: content calendar, photo and video posts, captions and
              community replies. Built around a steady weekly rhythm rather than bursts.
            </p>
            <a
              href="https://www.instagram.com/elitek9andanimalcare"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent"
            >
              View the account <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </article>

          <article className="flex flex-col rounded-2xl border border-border bg-card p-5">
            <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Design</span>
            <h2 className="mt-2 font-display text-2xl">Design portfolio</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              Cover art, episode artwork, social templates and campaign graphics — a spread of
              designs made for shows and small brands.
            </p>
            <a
              href="https://canva.link/argwwz1z8z4jddo"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm hover:bg-accent"
            >
              Open the portfolio <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </article>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-card p-6 text-center">
          <h2 className="font-display text-2xl">Want something like this for your show?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Build a quote in under a minute, then send the brief.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              See the rate card
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-border px-5 py-2.5 text-sm hover:bg-accent"
            >
              Start a project
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
