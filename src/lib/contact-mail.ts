import { createResendClient } from "@/lib/resend";
import type { ContactEnquiry } from "@/lib/contact-request";
import { site } from "@/lib/site";

const BARE_EMAIL =
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const NAMED_FROM =
  /^[^<>\r\n]{1,80}\s<[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}>$/i;

const PUBLIC_INBOX_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
]);

const RESEND_TEST_SENDER = "onboarding@resend.dev";

export type ContactMailConfig = {
  apiKey: string;
  verifiedFrom: string;
  inbox: string;
};

function senderAddress(value: string) {
  if (BARE_EMAIL.test(value)) return value;
  const named = value.match(/<([^<>\s]+)>\s*$/);
  if (named && NAMED_FROM.test(value) && BARE_EMAIL.test(named[1])) {
    return named[1];
  }
  return null;
}

function senderDomain(address: string) {
  return address.split("@")[1]?.toLowerCase() ?? "";
}

function isPublicInbox(address: string) {
  return PUBLIC_INBOX_DOMAINS.has(senderDomain(address));
}

function verifiedSenderAddress() {
  const address = senderAddress(process.env.CONTACT_FROM_EMAIL?.trim() ?? "");
  if (!address || isPublicInbox(address)) return null;
  return address;
}

function isResendTestSender(address: string) {
  return address.toLowerCase() === RESEND_TEST_SENDER;
}

function enquiryInbox(fromAddress: string) {
  if (!isResendTestSender(fromAddress)) return site.email;
  return senderAddress(process.env.CONTACT_TO_EMAIL?.trim() ?? "");
}

export function contactMailProblems() {
  const problems: string[] = [];
  if (!process.env.RESEND_API_KEY?.trim()) problems.push("RESEND_API_KEY");

  const raw = process.env.CONTACT_FROM_EMAIL?.trim() ?? "";
  const address = raw ? senderAddress(raw) : null;
  if (!raw || !address) problems.push("CONTACT_FROM_EMAIL");
  else if (isPublicInbox(address)) {
    problems.push(
      `CONTACT_FROM_EMAIL (@${senderDomain(address)} cannot be a Resend sender)`,
    );
  } else if (isResendTestSender(address) && !enquiryInbox(address)) {
    problems.push("CONTACT_TO_EMAIL");
  }

  return problems;
}

export function contactMailSetupMessage() {
  const raw = process.env.CONTACT_FROM_EMAIL?.trim() ?? "";
  const address = raw ? senderAddress(raw) : null;
  if (address && isPublicInbox(address)) {
    return `Resend cannot send from @${senderDomain(address)}. Set CONTACT_FROM_EMAIL to an address on a domain you verified in Resend, such as info@miqode.com. Enquiries are still delivered to ${site.email}.`;
  }

  if (address && isResendTestSender(address) && !enquiryInbox(address)) {
    return `CONTACT_FROM_EMAIL is Resend's test sender, so mail can only go to the email on your Resend account. Set CONTACT_TO_EMAIL to that address. After miqode.com is verified, switch CONTACT_FROM_EMAIL to an address on that domain and enquiries go to ${site.email}.`;
  }

  const problems = contactMailProblems();
  const listed =
    problems.length > 0
      ? problems.join(", ")
      : "RESEND_API_KEY, CONTACT_FROM_EMAIL";

  return `Email delivery is not configured. Set ${listed}. Enquiries are delivered to ${site.email}. CONTACT_FROM_EMAIL must be a sender on a domain verified in Resend. The visitor's address is used as the reply address. Do not prefix the API key with NEXT_PUBLIC_.`;
}

export function readContactMailConfig(): ContactMailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  const verifiedFrom = verifiedSenderAddress();
  if (!apiKey || !verifiedFrom) return null;
  const inbox = enquiryInbox(verifiedFrom);
  if (!inbox) return null;
  return { apiKey, verifiedFrom, inbox };
}

function enquiryFrom(enquiry: ContactEnquiry, verifiedFrom: string) {
  const name = enquiry.name.replace(/[\r\n<>"]/g, "").trim();
  const label = name || "Website enquiry";
  return `${label} <${verifiedFrom}>`;
}

export type DeliverEnquiryResult =
  | { status: "sent" }
  | { status: "unconfigured" }
  | { status: "failed"; devMessage?: string };

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function display(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "—";
}

function providerMessage(error: unknown) {
  let message = "Unknown email error";
  if (error instanceof Error) message = error.message;
  else if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    message = error.message;
  }

  return message.replace(/re_[A-Za-z0-9_-]+/g, "[redacted]").slice(0, 240);
}

function unverifiedSenderMessage(error: unknown) {
  const message = providerMessage(error);
  const domain = message.match(/The (\S+) domain is not verified/i);
  if (domain) {
    return `Resend has not verified ${domain[1]}. For local testing set CONTACT_FROM_EMAIL to onboarding@resend.dev and CONTACT_TO_EMAIL to the email on your Resend account. After you verify the domain at https://resend.com/domains, switch CONTACT_FROM_EMAIL to an address on that domain. Enquiries then go to ${site.email}.`;
  }

  const testing = message.match(
    /only send testing emails to your own email address \(([^)]+)\)/i,
  );
  if (testing) {
    return `Resend's test sender can only deliver to ${testing[1]}. Set CONTACT_TO_EMAIL to that address. .env is already being read. After miqode.com is verified, remove CONTACT_TO_EMAIL so enquiries go to ${site.email}.`;
  }

  return undefined;
}

function enquiryText(enquiry: ContactEnquiry) {
  return [
    "New Project Enquiry — Miqode",
    "",
    `Name: ${display(enquiry.name)}`,
    `Email: ${enquiry.email}`,
    `Company: ${display(enquiry.company)}`,
    `Phone: ${enquiry.phone}`,
    `Project / Service: ${enquiry.intentLabel}`,
    "",
    "Message:",
    enquiry.message,
  ].join("\n");
}

function enquiryHtml(enquiry: ContactEnquiry) {
  const rows = [
    ["Name", display(enquiry.name)],
    ["Email", enquiry.email],
    ["Company", display(enquiry.company)],
    ["Phone", enquiry.phone],
    ["Project / Service", enquiry.intentLabel],
  ];

  const details = rows
    .map(
      ([label, value]) => `<tr>
        <td style="padding:10px 16px 10px 0;vertical-align:top;color:#5c5852;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;">${escapeHtml(label)}</td>
        <td style="padding:10px 0;vertical-align:top;color:#1c1b19;font-size:15px;line-height:1.5;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:32px 16px;background:#f6f4ef;color:#1c1b19;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#fffcf7;border:1px solid #e4e0d8;padding:28px 28px 32px;">
      <p style="margin:0;color:#2f6d66;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;">miqode</p>
      <h1 style="margin:12px 0 0;font-size:22px;line-height:1.3;font-weight:600;">New Project Enquiry — Miqode</h1>
      <table role="presentation" style="width:100%;margin-top:20px;border-collapse:collapse;">${details}</table>
      <p style="margin:24px 0 8px;color:#5c5852;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;">Message</p>
      <p style="margin:0;white-space:pre-wrap;font-size:15px;line-height:1.6;">${escapeHtml(enquiry.message)}</p>
    </div>
  </body>
</html>`;
}

function acknowledgementText(name: string) {
  const greeting = name.trim() ? `Hi ${name.trim()},` : "Hi,";
  return [
    greeting,
    "",
    "Thanks for reaching out to Miqode.",
    "",
    "We've received your project enquiry and our team will review it shortly.",
    "",
    "We'll get back to you with the next steps.",
    "",
    "— Team Miqode",
  ].join("\n");
}

function acknowledgementHtml(name: string) {
  const greeting = name.trim() ? `Hi ${escapeHtml(name.trim())},` : "Hi,";
  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:32px 16px;background:#f6f4ef;color:#1c1b19;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#fffcf7;border:1px solid #e4e0d8;padding:28px 28px 32px;">
      <p style="margin:0;color:#2f6d66;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;">miqode</p>
      <p style="margin:20px 0 0;font-size:15px;line-height:1.6;">${greeting}</p>
      <p style="margin:16px 0 0;font-size:15px;line-height:1.6;">Thanks for reaching out to Miqode.</p>
      <p style="margin:16px 0 0;font-size:15px;line-height:1.6;">We've received your project enquiry and our team will review it shortly.</p>
      <p style="margin:16px 0 0;font-size:15px;line-height:1.6;">We'll get back to you with the next steps.</p>
      <p style="margin:24px 0 0;font-size:15px;line-height:1.6;">— Team Miqode</p>
    </div>
  </body>
</html>`;
}

export async function deliverEnquiry(
  enquiry: ContactEnquiry,
): Promise<DeliverEnquiryResult> {
  const config = readContactMailConfig();
  if (!config) {
    console.error(
      `Contact email is not configured (${contactMailProblems().join(", ")}).`,
    );
    return { status: "unconfigured" };
  }

  const resend = createResendClient(config.apiKey);

  try {
    const internal = await resend.emails.send({
      from: enquiryFrom(enquiry, config.verifiedFrom),
      to: config.inbox,
      replyTo: enquiry.email,
      subject: "New Project Enquiry — Miqode",
      html: enquiryHtml(enquiry),
      text: enquiryText(enquiry),
    });

    if (internal.error) {
      console.error(
        `Contact enquiry email failed: ${providerMessage(internal.error)}`,
      );
      return {
        status: "failed",
        devMessage: unverifiedSenderMessage(internal.error),
      };
    }
  } catch (error) {
    console.error(`Contact enquiry email failed: ${providerMessage(error)}`);
    return { status: "failed", devMessage: unverifiedSenderMessage(error) };
  }

  try {
    const acknowledgement = await resend.emails.send({
      from: `miqode <${config.verifiedFrom}>`,
      to: enquiry.email,
      replyTo: site.email,
      subject: "We've received your enquiry — Miqode",
      html: acknowledgementHtml(enquiry.name),
      text: acknowledgementText(enquiry.name),
    });

    if (acknowledgement.error) {
      console.error(
        `Contact acknowledgement email failed: ${providerMessage(acknowledgement.error)}`,
      );
    }
  } catch (error) {
    console.error(
      `Contact acknowledgement email failed: ${providerMessage(error)}`,
    );
  }

  return { status: "sent" };
}
