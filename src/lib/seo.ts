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
export const SITE_NAME = "Evadapt";
export const SITE_TITLE = "Evadapt";
export const SITE_DESCRIPTION =
  "BatchWise ML Lab exploration shell — co-founder workbench for synthetic fed-batch control research.";

export function absoluteSiteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
