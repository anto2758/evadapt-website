"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import {
  MarketingPageShell,
  useMarketingScrollContainer,
} from "./_components/marketing-page-shell";
import { MarketingPrimaryCta } from "./_components/marketing-primary-cta";

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
  const overlayOpacity = useTransform(weightedScroll, [0, 1], [0.5, 1]);
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
              <h1 className="max-w-[14ch] text-[48px] font-medium leading-[0.98] tracking-[-0.055em] text-[#f4f3ef] sm:text-[70px] lg:text-[88px]">
                <span
                  className="italic tracking-normal"
                  style={{
                    fontFamily: "var(--font-lora)",
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
                      "linear-gradient(175deg, #ffffff 0%, #f4f1ea 48%, #c9c4b8 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter:
                      "drop-shadow(0 1px 0 rgba(255, 255, 255, 0.42)) drop-shadow(0 3px 1px rgba(0, 0, 0, 0.42))",
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
          className="absolute inset-0 z-20 rounded-t-[28px] bg-[#161513]"
        />
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
