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
            url: url.pathname,
            hostname: url.hostname,
            referrer: request.headers.get("referer") || "",
            screen: "1920x1080", // Default since server-side
            language: request.headers.get("accept-language")?.split(",")[0] || "en-US",
            title: url.pathname // You can enhance this if you want
          }
        })
      }).catch(err => {
        console.error("Umami tracking error:", err)
      })
    )
  }

  return context.next()
}