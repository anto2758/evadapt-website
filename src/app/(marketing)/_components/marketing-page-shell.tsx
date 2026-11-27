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
  type RefObject,
  type SetStateAction,
} from "react";

import GhostFibers from "@/components/ghost-fibers";

import { Navbar } from "./navbar";

export const DEFAULT_MARKETING_BACKGROUND = "#10100e";

export const MarketingScrollContext =
  createContext<RefObject<HTMLDivElement | null> | null>(null);

export function useMarketingScrollContainer() {
  const ref = useContext(MarketingScrollContext);
  if (!ref) {
    throw new Error(
      "useMarketingScrollContainer must be used within MarketingPageShell"
    );
  }
  return ref;
}

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
      <MarketingScrollContext.Provider value={scrollSurfaceRef}>
        <div className="relative h-full min-h-0 w-full">
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 transition-[background-color] duration-[600ms] ease-out"
            style={{ backgroundColor: background }}
          >
            <GhostFibers
              glowColor="#ff7e00"
              layers={3}
              twist={1.2}
              threads={72}
              fiberStyle="dots"
              depthOfField={0.85}
              hoverEffect="focus"
              intro
              mouseInteraction
              lineColor="#ff4f00"
              secondaryColor="#ff5121"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #000 0%, rgba(0,0,0,0.55) 14%, rgba(0,0,0,0) 40%)",
              }}
            />
          </div>
          <div
            ref={scrollSurfaceRef}
            data-marketing-page-scroll-surface
            data-scrolled={scrolled ? "true" : "false"}
            data-marketing-background={background}
            className="relative z-10 h-full min-h-0 w-full overflow-x-hidden overflow-y-auto bg-transparent text-[#f4f3ef]"
          >
            <div className="relative z-10">
              <Navbar scrolled={scrolled} />
              {children}
            </div>
          </div>
        </div>
      </MarketingScrollContext.Provider>
    </MarketingPageThemeContext.Provider>
  );
}
