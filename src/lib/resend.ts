import { Resend } from "resend";

/**
 * Server-only Resend client. Import this from route handlers and other
 * server modules. Never import it from a client component.
 */
export function createResendClient(apiKey: string) {
  return new Resend(apiKey);
}
