import type { Metadata } from "next";
import React from "react";

import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full overflow-hidden bg-[#EDEDED] text-[#1c1b18]">
      <main className="h-full">{children}</main>
    </div>
  );
}
