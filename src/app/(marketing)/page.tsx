"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

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
  const overlayY = useTransform(scrollYProgress, [0, 1], ["78%", "0%"]);
  const heroFilter = useTransform(scrollYProgress, [0, 1], [
    "blur(0px)",
    "blur(16px)",
  ]);

  return (
    <div ref={trackRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <motion.div style={{ filter: heroFilter }} className="relative z-10">
          <main>
            <section className="px-5 pb-20 pt-[186px] text-center sm:px-8 sm:pb-28 sm:pt-[190px]">
              <h1 className="mx-auto max-w-[900px] text-[48px] font-semibold leading-[0.98] tracking-[-0.055em] text-[#f4f3ef] sm:text-[70px] lg:text-[88px]">
                BatchWise ML Lab exploration.
              </h1>
              <p className="mx-auto mt-7 max-w-[620px] text-[15px] leading-7 text-[#b7b6b0] sm:text-[19px] sm:leading-8">
                Co-founder workbench for synthetic fed-batch control research.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <MarketingPrimaryCta
                  label="Explore the lab"
                  variant="raised"
                  className="group relative inline-flex h-11 items-center justify-center gap-2"
                />
              </div>
              <p className="mt-4 text-[11px] text-[#8e8d87]">
                Synthetic data only · Fed-batch control research
              </p>
              <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] text-[#c4c3bd]">
                <span>In the lab:</span>
                <Link
                  href="/tools/linear-transformation-visualizer"
                  className="font-medium underline decoration-white/25 underline-offset-4 hover:decoration-white"
                >
                  Simulation lab
                </Link>
                <span aria-hidden>·</span>
                <Link
                  href="/tools/change-of-basis-calculator"
                  className="font-medium underline decoration-white/25 underline-offset-4 hover:decoration-white"
                >
                  Lab checkout
                </Link>
                <span aria-hidden>·</span>
                <Link
                  href="/tools/vector-field-visualizer"
                  className="font-medium underline decoration-white/25 underline-offset-4 hover:decoration-white"
                >
                  Editable board
                </Link>
              </p>
            </section>
          </main>
        </motion.div>
        <motion.div
          data-marketing-overlay
          style={{ y: overlayY }}
          className="absolute inset-0 z-20 rounded-t-[28px] border border-white/10 bg-[#1c1c1a] shadow-[0_-28px_80px_rgba(0,0,0,0.45)]"
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
