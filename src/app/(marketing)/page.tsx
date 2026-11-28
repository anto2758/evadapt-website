"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { ConcentricCirclesBackground } from "@/components/concentric-circles-background";
import LightRays from "@/components/light-rays";

import {
  MarketingPageShell,
  useMarketingScrollContainer,
} from "./_components/marketing-page-shell";
import { MarketingPrimaryCta } from "./_components/marketing-primary-cta";

const OVERLAY_LINE = [
  { text: "A", accent: false },
  { text: "lab", accent: true },
  { text: "for", accent: false },
  { text: "machine", accent: false },
  { text: "learning.", accent: true },
] as const;

/** Top corner radius — hard opaque edge (no fade). */
const OVERLAY_RADIUS_PX = 28;
/** Solid white sheet — light mode only. */
const OVERLAY_SHEET = "#ffffff";

/** Cool blue keywords (Lora italic) on the light sheet. */
const accentWordStyle = {
  fontFamily: "var(--font-lora)",
  fontStyle: "italic" as const,
  color: "#1a4f8c",
};

function OverlayWord({
  text,
  accent,
  index,
  progress,
}: {
  text: string;
  accent: boolean;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.03 + index * 0.04;
  const end = start + 0.055;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [18, 0]);

  return (
    <motion.span
      style={{ opacity, y, ...(accent ? accentWordStyle : undefined) }}
      className="inline-block overflow-visible pr-[0.28em] pb-[0.22em]"
    >
      {text}
    </motion.span>
  );
}

function HeroStage() {
  const scrollRef = useMarketingScrollContainer();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: scrollRef,
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const weightedScroll = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 22,
    mass: 1.9,
    restDelta: 0.001,
  });
  const overlayY = useTransform(weightedScroll, [0, 1], ["93%", "0%"]);
  const heroFilter = useTransform(weightedScroll, [0, 1], [
    "blur(0px)",
    "blur(16px)",
  ]);

  return (
    <div ref={trackRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-dvh overflow-hidden [contain:paint]">
        {/* Shared blur: circles + hero. Own compositor layer so filter
            animates a bitmap, not a live SVG+filter tree each frame. */}
        <motion.div
          style={{
            filter: heroFilter,
            transform: "translateZ(0)",
            isolation: "isolate",
            backfaceVisibility: "hidden",
          }}
          className="absolute inset-0 z-10"
        >
          <ConcentricCirclesBackground />
          {/* Whisper LightRays — atmosphere only; never above clickable UI. */}
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
          <main className="relative z-[2]">
            <section className="px-6 pb-20 pt-[248px] text-center sm:px-12 sm:pb-28 sm:pt-[268px] lg:px-20">
              <h1 className="mx-auto max-w-[14ch] text-[48px] font-medium leading-[0.98] tracking-[-0.055em] text-[#1c2430] sm:text-[70px] lg:text-[88px]">
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
              <div className="mt-9 flex justify-center">
                <MarketingPrimaryCta
                  label="Explore the lab"
                  variant="raised"
                  className="group relative inline-flex h-11 items-center justify-center gap-2"
                />
              </div>
            </section>
          </main>
        </motion.div>
        <motion.div
          data-marketing-overlay
          style={{
            // y already promotes a compositor layer (GPU transform path).
            y: overlayY,
            opacity: 1,
            borderRadius: `${OVERLAY_RADIUS_PX}px ${OVERLAY_RADIUS_PX}px 0 0`,
            backgroundColor: OVERLAY_SHEET,
            border: "none",
            outline: "none",
            boxShadow: "none",
            backfaceVisibility: "hidden",
          }}
          className="absolute inset-0 z-20"
        >
          <p className="whitespace-nowrap px-6 pt-16 pb-4 text-left text-[clamp(1.25rem,4.2vw,3.25rem)] font-medium leading-[1.45] tracking-[-0.03em] text-[#1c2a3d] sm:px-12 sm:pt-20 lg:px-20">
            {OVERLAY_LINE.map((word, index) => (
              <OverlayWord
                key={word.text}
                text={word.text}
                accent={word.accent}
                index={index}
                progress={weightedScroll}
              />
            ))}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function MarketingPage() {
  return (
    <MarketingPageShell>
      <HeroStage />
    </MarketingPageShell>
  );
}
