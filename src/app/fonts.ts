import localFont from "next/font/local";

/**
 * Self-hosted latin variable font. Kept in-repo so `next build` never fetches
 * Google Fonts (intermittent extensionless `/l/font?kit=` URLs crash next/font).
 */
export const fontInter = localFont({
  src: [
    {
      path: "../fonts/inter/inter-latin-normal.woff2",
      weight: "400 700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const fontLora = localFont({
  src: [
    {
      path: "../fonts/lora/lora-latin-italic.woff2",
      weight: "400 700",
      style: "italic",
    },
  ],
  variable: "--font-lora",
  display: "swap",
});
