"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

import { isGraphiteDesktop } from "@/lib/desktop";
import { detectDesktopPlatform, type DesktopPlatform } from "@/lib/desktopPlatform";
import { cn } from "@/lib/utils";

const platformNames = { macos: "Mac", windows: "Windows", linux: "Linux" };

export function DesktopDownloadButton({
  className,
  label = (platform) => `Download for ${platform}`,
}: {
  className?: string;
  label?: (platform: string) => string;
}) {
  const [platform, setPlatform] = useState<DesktopPlatform | null>(null);

  useEffect(() => {
    if (!isGraphiteDesktop()) setPlatform(detectDesktopPlatform(navigator));
  }, []);

  if (!platform) return null;

  return (
    <a
      href={`/api/desktop/download?platform=${platform}`}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-[7px] border border-black/10 dark:border-edge bg-white dark:bg-surface px-4 text-sm font-medium text-[#37352F] dark:text-ink transition-colors hover:bg-neutral-50 dark:hover:bg-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-edge focus-visible:ring-offset-2",
        className
      )}
    >
      <Download aria-hidden="true" className="h-4 w-4 shrink-0" />
      {label(platformNames[platform])}
    </a>
  );
}
