export type ContactRateLimitResult = { limited: false } | { limited: true };

/**
 * Identity for a future distributed limiter. Uses the first forwarded address
 * when a proxy provides one.
 */
export function contactClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown";

  return ip.replace(/[\r\n]/g, "").slice(0, 80);
}

/**
 * Rate-limit hook for the public enquiry form.
 *
 * This site has no shared store. An in-memory counter would reset on every
 * serverless instance and look like protection it does not provide, so this
 * hook currently allows the request through.
 *
 * Replace the body with a Redis or KV check keyed by `clientKey` — for
 * example five submissions in ten minutes — and return `{ limited: true }`
 * when the visitor should wait. Do not add that store only for this form.
 */
export async function checkContactRateLimit(
  clientKey: string,
): Promise<ContactRateLimitResult> {
  // Accepted so a Redis limiter can key off the caller without a route change.
  void clientKey;
  return { limited: false };
}
