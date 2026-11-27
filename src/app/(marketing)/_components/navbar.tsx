"use client";

import Link from "next/link";
import GhostButton from "@/components/ui/ghost-button";
import Button1 from "./button1";

type NavbarProps = {
  scrolled?: boolean; // simple boolean from the page
};

export const Navbar = ({ scrolled }: NavbarProps) => {
  return (
    <nav
      data-marketing-navbar
      data-scrolled={scrolled ? "true" : "false"}
      className={[
        "fixed top-0 left-0 right-0 z-[200]",
        "bg-transparent transition-all duration-300",
      ].join(" ")}
      role="navigation"
      aria-label="Main"
      style={{ isolation: "isolate" }}
    >
      {/* Inner wrapper that becomes a box on scroll */}
      <div
        className={[
          "border",
          scrolled
            ? [
                "mx-4 mt-4 w-[calc(100%-2rem)] soft-small-shadow",
                "rounded-2xl border-black/10 bg-white/75 backdrop-blur-xl",
              ].join(" ")
            : "mx-0 mt-0 w-full rounded-none border-transparent bg-transparent shadow-none",
        ].join(" ")}
      >
        <div
          className={[
            "grid grid-cols-[auto_1fr_auto] items-center w-full",
            scrolled ? "px-3 py-3" : "px-4 py-4",
          ].join(" ")}
        >
          {/* Left */}
          <div className="flex items-center">
            <Link
              href="/"
              className={[
                "flex items-center gap-2 font-semibold leading-none select-none transition-all duration-300",
              ].join(" ")}
            >
              <img alt="Evadapt" height={32} width={32} src={"/blackLogo.png"} />
              <span className="text-[14px] tracking-[-0.02em] text-[#242421]">
                Evadapt
              </span>
            </Link>
          </div>

          {/* Middle */}
          <div
            className={[
              "hidden justify-center items-center text-neutral-800 transition-all duration-300 md:flex",
              scrolled ? "gap-7 text-sm lg:gap-10" : "gap-8 text-sm lg:gap-11",
            ].join(" ")}
          >
            <Link href="/tools" className="hover:text-black transition-colors">
              Simulations
            </Link>
            <Link
              href="/#resources"
              className="hover:text-black transition-colors"
            >
              World models
            </Link>
            <Link
              href="/#use-cases"
              className="hover:text-black transition-colors"
            >
              Safety
            </Link>
            <Link
              href="/privacy"
              className="hover:text-black transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-black transition-colors">
              Terms
            </Link>
          </div>

          {/* Right */}
          <div
            className={[
              "flex items-center justify-end transition-all duration-300",
              scrolled ? "gap-2" : "gap-3",
            ].join(" ")}
          >
            <span className="hidden sm:inline-flex">
              <GhostButton label="Log in" style={{ color: "#000000" }} />
            </span>
            <Button1 theme={"light"} buttonText={"Open the lab"} />
          </div>
        </div>
      </div>
    </nav>
  );
};
