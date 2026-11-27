const FALLBACK_SITE_URL = "https://www.graphite.so";

function resolveSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    FALLBACK_SITE_URL;

  try {
    return new URL(
      configuredUrl.startsWith("http")
        ? configuredUrl
        : `https://${configuredUrl}`,
    );
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = "Graphite";
export const SITE_TITLE = "Graphite";
export const SITE_DESCRIPTION =
  "Write notes together, share course materials, solve assignments, and study with an AI tutor in one free collaborative workspace.";

export function absoluteSiteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
