"use client";

import {
  CIRCLES_COVER_H,
  ConcentricCirclesBackground,
  FIELD_COLOR,
  VIEW_H as CIRCLES_VIEW_H,
  VIEW_W as CIRCLES_VIEW_W,
} from "@/components/concentric-circles-background";
import LightRays from "@/components/light-rays";

import { MarketingPageShell } from "./_components/marketing-page-shell";

/** Match prior cover scale: max(vw/W, dvh/coverH); taller than dvh so full discs fit. */
const CIRCLES_LAYER_HEIGHT = `max(calc(100vw * ${CIRCLES_VIEW_H} / ${CIRCLES_VIEW_W}), calc(100dvh * ${CIRCLES_VIEW_H} / ${CIRCLES_COVER_H}))`;

export default function MarketingPage() {
  return (
    <MarketingPageShell>
      {/* Tall scroll page; mid/lower field continues under the full 300vh (no hard cut). */}
      <div
        className="relative h-[300vh]"
        style={{ backgroundColor: FIELD_COLOR }}
      >
        {/* Full discs flush to the top so the crown wash sits under the navbar
            (no solid FIELD_COLOR strip from a downward translate). */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full"
          style={{ height: CIRCLES_LAYER_HEIGHT }}
        >
          <div className="absolute inset-0">
            <ConcentricCirclesBackground />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1]"
          >
            <LightRays
              raysOrigin="top-center"
              raysColor="#C8D4E4"
              lightMode
              followMouse
              mouseInfluence={0.05}
              intensity={0.35}
              opacity={0.22}
              glow={0.25}
              haze={0.12}
              lightSpread={0.65}
              rayLength={2.2}
              rayDensity={0.85}
              raysSpeed={0.55}
              cursorShadow={false}
              clickPulse={false}
              pulsating={false}
            />
          </div>
        </div>

        {/* Hero copy in the first viewport; scrolls with the page. */}
        <main className="pointer-events-none absolute inset-x-0 top-0 z-[2]">
          <section className="flex min-h-dvh items-start justify-center px-6 pb-20 pt-[200px] text-center sm:px-12 sm:pb-28 sm:pt-[220px] lg:px-20">
            <h1 className="pointer-events-auto mx-auto max-w-[14ch] text-[48px] font-medium leading-[0.98] tracking-[-0.055em] text-[#1c2430] sm:text-[70px] lg:text-[88px]">
              <span
                className="italic tracking-normal"
                style={{
                  fontFamily: "var(--font-lora)",
                  fontStyle: "italic",
                  color: "#1a4f8c",
                }}
              >
                Evadapt
              </span>{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(175deg, #171c24 0%, #3a4656 52%, #627388 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                ML Lab exploration.
              </span>
            </h1>
          </section>
        </main>
      </div>
    </MarketingPageShell>
  );
}
