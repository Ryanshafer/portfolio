import type { Config } from "@netlify/edge-functions"

export default async (request: Request, context: any) => {
  const url = new URL(request.url)

  // Skip tracking for static assets and Astro build files
  if (
    url.pathname.includes(".") ||
    url.pathname.startsWith("/_astro") ||
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api")
  ) {
    return context.next()
  }

  const UMAMI_ENDPOINT = Deno.env.get("UMAMI_ENDPOINT")
  const UMAMI_WEBSITE_ID = Deno.env.get("UMAMI_WEBSITE_ID")

  if (UMAMI_ENDPOINT && UMAMI_WEBSITE_ID) {
    // Normalize pathname: remove trailing slash (except for root)
    let normalizedPath = url.pathname
    if (normalizedPath !== "/" && normalizedPath.endsWith("/")) {
      normalizedPath = normalizedPath.slice(0, -1)
    }

    // Fire-and-forget tracking request
    context.waitUntil(
      fetch(UMAMI_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": request.headers.get("user-agent") || "netlify-edge"
        },
        body: JSON.stringify({
          type: "event",
          payload: {
            website: UMAMI_WEBSITE_ID,
            url: normalizedPath,  // Use normalized path
            hostname: url.hostname,
            referrer: request.headers.get("referer") || "",
            screen: "1920x1080",
            language: request.headers.get("accept-language")?.split(",")[0] || "en-US",
            title: normalizedPath  // Use normalized path here too
          }
        })
      }).catch(err => {
        console.error("Umami tracking error:", err)
      })
    )
  }

  return context.next()
}

export const config: Config = {
  path: "/*"
}