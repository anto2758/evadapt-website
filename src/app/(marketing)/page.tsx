"use client";

import Link from "next/link";
import { DesktopDownloadButton } from "@/components/desktop-download-button";

import { MarketingPageShell } from "./_components/marketing-page-shell";
import { MarketingPrimaryCta } from "./_components/marketing-primary-cta";

export default function MarketingPage() {
  return (
    <MarketingPageShell>
      <main>
        <section className="px-5 pb-20 pt-[186px] text-center sm:px-8 sm:pb-28 sm:pt-[190px]">
          <h1 className="mx-auto max-w-[900px] text-[48px] font-semibold leading-[0.98] tracking-[-0.055em] text-[#242421] sm:text-[70px] lg:text-[88px]">
            One shared workspace for every course.
          </h1>
          <p className="mx-auto mt-7 max-w-[620px] text-[15px] leading-7 text-[#65655f] sm:text-[19px] sm:leading-8">
            Write notes together, share course materials, and solve assignments
            in the same live workspace.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <MarketingPrimaryCta
              label="Create a free workspace"
              variant="raised"
              className="group relative inline-flex h-11 items-center justify-center gap-2 text-white"
            />
            <DesktopDownloadButton />
          </div>
          <p className="mt-4 text-[11px] text-[#9b9b95]">
            Free for students · Invite your whole study group
          </p>
          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] text-[#777770]">
            <span>Try a free tool:</span>
            <Link
              href="/tools/linear-transformation-visualizer"
              className="font-medium underline decoration-black/20 underline-offset-4 hover:decoration-black"
            >
              Linear transformation calculator
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/tools/change-of-basis-calculator"
              className="font-medium underline decoration-black/20 underline-offset-4 hover:decoration-black"
            >
              Change of basis calculator
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/tools/vector-field-visualizer"
              className="font-medium underline decoration-black/20 underline-offset-4 hover:decoration-black"
            >
              Vector field visualizer
            </Link>
          </p>
        </section>
      </main>
    </MarketingPageShell>
  );
}
