"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { Navbar } from "./navbar";

export const DEFAULT_MARKETING_BACKGROUND = "#D6DEE8";

type MarketingPageTheme = {
  background: string;
  setBackground: Dispatch<SetStateAction<string>>;
};

const MarketingPageThemeContext = createContext<MarketingPageTheme | null>(
  null
);

export function useMarketingPageTheme() {
  const theme = useContext(MarketingPageThemeContext);
  if (!theme) {
    throw new Error(
      "useMarketingPageTheme must be used within MarketingPageShell"
    );
  }
  return theme;
}

export function MarketingPageShell({ children }: { children: ReactNode }) {
  const scrollSurfaceRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [background, setBackground] = useState(DEFAULT_MARKETING_BACKGROUND);
  const theme = useMemo(() => ({ background, setBackground }), [background]);

  useEffect(() => {
    const surface = scrollSurfaceRef.current;
    if (!surface) return;
    const syncScrolled = () => {
      const next =
        Math.max(
          surface.scrollTop,
          window.scrollY,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) > 12;
      setScrolled((current) => (current === next ? current : next));
    };
    syncScrolled();
    surface.addEventListener("scroll", syncScrolled, { passive: true });
    window.addEventListener("scroll", syncScrolled, { passive: true });
    return () => {
      surface.removeEventListener("scroll", syncScrolled);
      window.removeEventListener("scroll", syncScrolled);
    };
  }, []);

  return (
    <MarketingPageThemeContext.Provider value={theme}>
      <div className="relative h-full min-h-0 w-full">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-[background-color] duration-[600ms] ease-out"
          style={{
            backgroundColor: background,
            backgroundImage:
              background === DEFAULT_MARKETING_BACKGROUND
                ? "linear-gradient(to bottom, #F8FAFC 0%, #F1F5F9 16%, #E0E7F0 36%, #D6DEE8 55%, #D6DEE8 100%)"
                : undefined,
          }}
        />
        <div
          ref={scrollSurfaceRef}
          data-marketing-page-scroll-surface
          data-scrolled={scrolled ? "true" : "false"}
          data-marketing-background={background}
          className="relative z-10 h-full min-h-0 w-full overflow-x-hidden overflow-y-auto bg-transparent text-[#1c1b18]"
        >
          <div className="relative z-10">
            <Navbar scrolled={scrolled} />
            {children}
          </div>
        </div>
      </div>
    </MarketingPageThemeContext.Provider>
  );
}
