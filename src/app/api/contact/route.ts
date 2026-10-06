import { contactMailSetupMessage, deliverEnquiry } from "@/lib/contact-mail";
import {
  checkContactRateLimit,
  contactClientKey,
} from "@/lib/contact-rate-limit";
import {
  honeypotTripped,
  parseContactRequest,
  sanitizeContactBody,
} from "@/lib/contact-request";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 24_000;
const FAILURE = "Unable to send your message. Please try again.";

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function fail(status: number, message = FAILURE) {
  return json({ success: false, message }, status);
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return fail(415);
  }

  const declaredLength = request.headers.get("content-length");
  if (declaredLength) {
    const size = Number(declaredLength);
    if (!Number.isFinite(size) || size < 0 || size > MAX_BODY_BYTES) {
      return fail(413);
    }
  }

  let raw = "";
  try {
    raw = await request.text();
  } catch {
    return fail(400);
  }

  if (raw.length > MAX_BODY_BYTES) return fail(413);

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return fail(400);
  }

  const body = sanitizeContactBody(payload);
  if (honeypotTripped(body)) {
    return json({ success: true });
  }

  const limit = await checkContactRateLimit(contactClientKey(request));
  if (limit.limited) {
    return fail(429, "Please wait a moment before sending another message.");
  }

  const parsed = parseContactRequest(body);
  if (!parsed.ok) {
    return fail(400, "Please check the form and try again.");
  }

  const result = await deliverEnquiry(parsed.enquiry);
  if (result.status === "sent") return json({ success: true });

  if (process.env.NODE_ENV === "development") {
    if (result.status === "unconfigured") {
      return json(
        {
          success: false,
          code: "not_configured",
          message: contactMailSetupMessage(),
        },
        503,
      );
    }

    if (result.status === "failed" && result.devMessage) {
      return json(
        {
          success: false,
          code: "not_configured",
          message: result.devMessage,
        },
        503,
      );
    }
  }

  return fail(503);
}
