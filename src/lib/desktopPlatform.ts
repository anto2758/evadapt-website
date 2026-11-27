export type DesktopPlatform = "macos" | "windows" | "linux";

type BrowserDevice = {
  userAgent: string;
  platform: string;
  maxTouchPoints: number;
  userAgentData?: { platform?: string; mobile?: boolean };
};

export function detectDesktopPlatform(device: BrowserDevice): DesktopPlatform | null {
  const platform = device.userAgentData?.platform || device.platform;
  const agent = device.userAgent;

  // iPadOS can identify itself as a Mac; Android often reports Linux.
  if (
    device.userAgentData?.mobile ||
    /Android|iPhone|iPad|iPod|Mobile|CrOS/i.test(agent) ||
    (/Mac/i.test(platform) && device.maxTouchPoints > 1)
  ) return null;

  if (/Mac/i.test(platform)) return "macos";
  if (/Win/i.test(platform)) return "windows";
  if (/Linux/i.test(platform)) return "linux";
  return null;
}
