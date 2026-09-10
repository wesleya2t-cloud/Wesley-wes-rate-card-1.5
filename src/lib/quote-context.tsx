import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  EMPTY_SELECTION,
  buildQuote,
  decodeSelection,
  encodeSelection,
  type Currency,
  type Quote,
  type Selection,
} from "./pricing";

const STORAGE_KEY = "wes-rate-card-quote-v1";
const CURRENCY_KEY = "wes-rate-card-currency-v1";

type QuoteContextValue = {
  selection: Selection;
  quote: Quote;
  currency: Currency;
  hydrated: boolean;
  setCurrency: (c: Currency) => void;
  selectPodcast: (id: string) => void;
  setEpisodes: (n: number) => void;
  selectSocial: (id: string) => void;
  toggleAddon: (id: string) => void;
  reset: () => void;
  shareUrl: () => string;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<Selection>(EMPTY_SELECTION);
  const [currency, setCurrencyState] = useState<Currency>("KES");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const fromUrl = decodeSelection(window.location.search);
      if (fromUrl) {
        setSelection(fromUrl);
      } else {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) setSelection({ ...EMPTY_SELECTION, ...JSON.parse(raw) });
      }
      const cur = window.localStorage.getItem(CURRENCY_KEY);
      if (cur === "USD" || cur === "KES") setCurrencyState(cur);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    } catch {
      /* ignore */
    }
  }, [selection, hydrated]);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    try {
      window.localStorage.setItem(CURRENCY_KEY, c);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<QuoteContextValue>(() => {
    return {
      selection,
      quote: buildQuote(selection),
      currency,
      hydrated,
      setCurrency,
      selectPodcast: (id) =>
        setSelection((s) => ({ ...s, podcast: s.podcast === id ? null : id })),
      setEpisodes: (n) => setSelection((s) => ({ ...s, episodes: Math.min(30, Math.max(1, n)) })),
      selectSocial: (id) => setSelection((s) => ({ ...s, social: s.social === id ? null : id })),
      toggleAddon: (id) =>
        setSelection((s) => ({
          ...s,
          addons: s.addons.includes(id) ? s.addons.filter((a) => a !== id) : [...s.addons, id],
        })),
      reset: () => setSelection(EMPTY_SELECTION),
      shareUrl: () => {
        const q = encodeSelection(selection);
        const origin = typeof window === "undefined" ? "" : window.location.origin;
        return q ? `${origin}/?${q}` : origin || "/";
      },
    };
  }, [selection, currency, hydrated, setCurrency]);

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used inside QuoteProvider");
  return ctx;
}
