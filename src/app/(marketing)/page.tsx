"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

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

const accentWordStyle = {
  fontFamily: "var(--font-lora)",
  fontStyle: "italic" as const,
  backgroundImage:
    "linear-gradient(168deg, #ffd7a1 0%, #ff7e00 46%, #e24a00 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
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
  const start = 0.08 + index * 0.12;
  const end = start + 0.16;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [18, 0]);

  return (
    <motion.span
      style={{ opacity, y, ...(accent ? accentWordStyle : undefined) }}
      className="inline-block pr-[0.28em]"
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
  const overlayOpacity = useTransform(weightedScroll, [0, 1], [0.8, 1]);
  const heroFilter = useTransform(weightedScroll, [0, 1], [
    "blur(0px)",
    "blur(16px)",
  ]);

  return (
    <div ref={trackRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <motion.div style={{ filter: heroFilter }} className="relative z-10">
          <main>
            <section className="px-6 pb-20 pt-[248px] text-left sm:px-12 sm:pb-28 sm:pt-[268px] lg:px-20">
              <h1 className="max-w-[14ch] text-[48px] font-medium leading-[0.98] tracking-[-0.055em] text-[#1c1b18] sm:text-[70px] lg:text-[88px]">
                <span
                  className="italic tracking-normal"
                  style={{
                    fontFamily: "var(--font-lora)",
                    fontStyle: "italic",
                    backgroundImage:
                      "linear-gradient(168deg, #ffd7a1 0%, #ff7e00 46%, #e24a00 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter:
                      "drop-shadow(0 1px 0 rgba(255, 236, 214, 0.5)) drop-shadow(0 3px 0 rgba(110, 38, 0, 0.42)) drop-shadow(0 5px 3px rgba(30, 10, 0, 0.38))",
                  }}
                >
                  Evadapt
                </span>{" "}
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(175deg, #1a1916 0%, #3c3934 52%, #6a655c 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter:
                      "drop-shadow(0 1px 0 rgba(255, 255, 255, 0.7)) drop-shadow(0 2px 1px rgba(0, 0, 0, 0.2))",
                  }}
                >
                  ML Lab exploration.
                </span>
              </h1>
              <div className="mt-9 flex">
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
          style={{ y: overlayY, opacity: overlayOpacity }}
          className="absolute inset-0 z-20 rounded-t-[28px] bg-[#121110]"
        >
          <p className="max-w-[14ch] px-6 pt-16 text-left text-[36px] font-medium leading-[1.05] tracking-[-0.04em] text-[#f4f3ef] sm:px-12 sm:pt-20 sm:text-[52px] lg:px-20">
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
