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
    stiffness: 32,
    damping: 18,
    mass: 2.4,
    restDelta: 0.001,
  });
  const overlayY = useTransform(weightedScroll, [0, 1], ["93%", "0%"]);
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
                      "drop-shadow(0 1px 0 rgba(255, 226, 186, 0.32)) drop-shadow(0 2px 1px rgba(72, 26, 0, 0.48))",
                  }}
                >
                  Evadapt
                </span>{" "}
                ML Lab exploration.
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
          style={{ y: overlayY }}
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
