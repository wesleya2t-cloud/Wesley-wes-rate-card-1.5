export type Tier = {
  id: string;
  name: string;
  blurb: string;
  includes: string[];
  low: number;
  high: number;
  unit: string;
};

export const PODCAST_TIERS: Tier[] = [
  {
    id: "edit",
    name: "Edit only",
    blurb: "You bring the raw recording, I hand back something broadcast-ready.",
    includes: [
      "Audio cleanup & noise reduction",
      "Level balancing across speakers",
      "Intro and outro placement",
      "One round of revisions",
    ],
    low: 3500,
    high: 6000,
    unit: "episode",
  },
  {
    id: "full",
    name: "Full production",
    blurb: "Everything in Edit only, plus planning, session support and publishing.",
    includes: [
      "Everything in Edit only",
      "Pre-production planning",
      "Session support on recording day",
      "Written show notes",
      "Upload to one platform",
    ],
    low: 8000,
    high: 15000,
    unit: "episode",
  },
  {
    id: "fullservice",
    name: "Full service",
    blurb: "The whole show handled — long form, clips, transcript, distribution.",
    includes: [
      "Everything in Full production",
      "3-5 short clips or audiograms with captions",
      "Full transcript",
      "Distribution across platforms",
    ],
    low: 18000,
    high: 30000,
    unit: "episode",
  },
];

export const SOCIAL_TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    blurb: "A steady, approved presence on the two platforms that matter most.",
    includes: [
      "2 platforms",
      "~12 posts a month",
      "Content calendar you approve ahead",
      "Basic monthly summary",
    ],
    low: 15000,
    high: 25000,
    unit: "month",
  },
  {
    id: "growth",
    name: "Growth",
    blurb: "More ground covered, plus someone actually answering your comments.",
    includes: [
      "3 platforms",
      "~20 posts a month",
      "Community management",
      "Monthly performance report",
    ],
    low: 30000,
    high: 45000,
    unit: "month",
  },
  {
    id: "fulldm",
    name: "Full digital marketing",
    blurb: "Daily presence, paid support and a strategy call every month.",
    includes: [
      "3-4 platforms",
      "Daily posting",
      "Paid ad support",
      "Monthly strategy call",
      "Full analytics reporting",
    ],
    low: 60000,
    high: 90000,
    unit: "month",
  },
];

export type AddOn = {
  id: string;
  name: string;
  note: string;
  low: number;
  high: number;
  percentOfPodcast?: number;
};

export const ADDONS: AddOn[] = [
  {
    id: "rush",
    name: "Rush turnaround",
    note: "Delivered in under 48 hours. Needs a podcast package selected.",
    low: 0,
    high: 0,
    percentOfPodcast: 0.2,
  },
  {
    id: "script",
    name: "Episode script or question prep",
    note: "A running order and interview questions written before you record.",
    low: 3000,
    high: 5000,
  },
  {
    id: "guest",
    name: "Guest research briefing",
    note: "A one-page brief on your guest so you never open cold.",
    low: 2500,
    high: 4000,
  },
  {
    id: "art",
    name: "Cover art / episode artwork",
    note: "Show art or per-episode artwork sized for every platform.",
    low: 5000,
    high: 8000,
  },
  {
    id: "web",
    name: "Website design",
    note: "Scope-dependent — from a one-pager to a full multi-page site.",
    low: 20000,
    high: 150000,
  },
];

export const RETAINER_MIN_EPISODES = 4;
export const RETAINER_DISCOUNT = 0.12;
export const BUNDLE_DISCOUNT = 0.05;
export const USD_RATE = 130;

export type Selection = {
  podcast: string | null;
  episodes: number;
  social: string | null;
  addons: string[];
};

export const EMPTY_SELECTION: Selection = {
  podcast: null,
  episodes: 1,
  social: null,
  addons: [],
};

export type LineItem = {
  label: string;
  detail?: string;
  low: number;
  high: number;
  negative?: boolean;
};

export type Quote = {
  items: LineItem[];
  low: number;
  high: number;
  mid: number;
  retainerApplied: boolean;
  bundleApplied: boolean;
  isEmpty: boolean;
};

const findTier = (list: Tier[], id: string | null) => list.find((t) => t.id === id) ?? null;

export function buildQuote(sel: Selection): Quote {
  const items: LineItem[] = [];
  const podcast = findTier(PODCAST_TIERS, sel.podcast);
  const social = findTier(SOCIAL_TIERS, sel.social);
  const episodes = Math.max(1, sel.episodes);

  let podLow = 0;
  let podHigh = 0;
  if (podcast) {
    podLow = podcast.low * episodes;
    podHigh = podcast.high * episodes;
    items.push({
      label: `Podcast — ${podcast.name}`,
      detail: `${episodes} episode${episodes > 1 ? "s" : ""} / month`,
      low: podLow,
      high: podHigh,
    });
  }

  let socLow = 0;
  let socHigh = 0;
  if (social) {
    socLow = social.low;
    socHigh = social.high;
    items.push({
      label: `Social media — ${social.name}`,
      detail: "per month",
      low: socLow,
      high: socHigh,
    });
  }

  let addLow = 0;
  let addHigh = 0;
  for (const id of sel.addons) {
    const addon = ADDONS.find((a) => a.id === id);
    if (!addon) continue;
    if (addon.percentOfPodcast) {
      if (!podcast) continue;
      const l = Math.round(podLow * addon.percentOfPodcast);
      const h = Math.round(podHigh * addon.percentOfPodcast);
      addLow += l;
      addHigh += h;
      items.push({ label: addon.name, detail: "+20% of podcast total", low: l, high: h });
    } else {
      addLow += addon.low;
      addHigh += addon.high;
      items.push({ label: addon.name, low: addon.low, high: addon.high });
    }
  }

  let low = podLow + socLow + addLow;
  let high = podHigh + socHigh + addHigh;

  const retainerApplied = Boolean(podcast) && episodes >= RETAINER_MIN_EPISODES;
  if (retainerApplied) {
    const l = Math.round(podLow * RETAINER_DISCOUNT);
    const h = Math.round(podHigh * RETAINER_DISCOUNT);
    low -= l;
    high -= h;
    items.push({
      label: "Retainer discount",
      detail: "12% off podcast — 4+ episodes a month",
      low: -l,
      high: -h,
      negative: true,
    });
  }

  const bundleApplied = Boolean(podcast) && Boolean(social);
  if (bundleApplied) {
    const baseLow = podLow + socLow - (retainerApplied ? Math.round(podLow * RETAINER_DISCOUNT) : 0);
    const baseHigh =
      podHigh + socHigh - (retainerApplied ? Math.round(podHigh * RETAINER_DISCOUNT) : 0);
    const l = Math.round(baseLow * BUNDLE_DISCOUNT);
    const h = Math.round(baseHigh * BUNDLE_DISCOUNT);
    low -= l;
    high -= h;
    items.push({
      label: "Bundle discount",
      detail: "5% off podcast + social together",
      low: -l,
      high: -h,
      negative: true,
    });
  }

  return {
    items,
    low,
    high,
    mid: Math.round((low + high) / 2),
    retainerApplied,
    bundleApplied,
    isEmpty: items.length === 0,
  };
}

export type Currency = "KES" | "USD";

export function formatMoney(amountKes: number, currency: Currency): string {
  const negative = amountKes < 0;
  const abs = Math.abs(amountKes);
  const value = currency === "USD" ? Math.round(abs / USD_RATE) : abs;
  const formatted = value.toLocaleString("en-US");
  const prefix = currency === "USD" ? "$" : "KES ";
  return `${negative ? "-" : ""}${prefix}${formatted}`;
}

export function quoteToText(sel: Selection, currency: Currency): string {
  const q = buildQuote(sel);
  if (q.isEmpty) return "No packages selected yet.";
  const lines = q.items.map(
    (i) =>
      `- ${i.label}${i.detail ? ` (${i.detail})` : ""}: ${formatMoney(i.low, currency)} - ${formatMoney(i.high, currency)}`,
  );
  lines.push(
    `Estimated total: ${formatMoney(q.low, currency)} - ${formatMoney(q.high, currency)} (midpoint ${formatMoney(q.mid, currency)})`,
  );
  return lines.join("\n");
}

export function encodeSelection(sel: Selection): string {
  const parts = [
    sel.podcast ? `p=${sel.podcast}` : "",
    sel.podcast ? `e=${sel.episodes}` : "",
    sel.social ? `s=${sel.social}` : "",
    sel.addons.length ? `a=${sel.addons.join(".")}` : "",
  ].filter(Boolean);
  return parts.join("&");
}

export function decodeSelection(search: string): Selection | null {
  const params = new URLSearchParams(search);
  if (!params.has("p") && !params.has("s") && !params.has("a")) return null;
  const podcastId = params.get("p");
  const socialId = params.get("s");
  return {
    podcast: PODCAST_TIERS.some((t) => t.id === podcastId) ? podcastId : null,
    episodes: Math.min(30, Math.max(1, Number(params.get("e") ?? 1) || 1)),
    social: SOCIAL_TIERS.some((t) => t.id === socialId) ? socialId : null,
    addons: (params.get("a") ?? "")
      .split(".")
      .filter((id) => ADDONS.some((a) => a.id === id)),
  };
}
