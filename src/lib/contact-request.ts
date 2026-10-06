import { z } from "zod";

import { projectIntents } from "@/lib/inquiry";

const intentIds = new Set<string>(projectIntents.map((item) => item.id));

const contactRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .max(80)
    .refine((value) => value.length !== 1),
  email: z.string().trim().max(254).pipe(z.email()),
  phone: z.string().trim().min(8).max(24),
  company: z.string().trim().max(80).optional().default(""),
  intent: z
    .string()
    .trim()
    .refine((value) => intentIds.has(value)),
  message: z.string().trim().min(8).max(2000),
});

export type ContactEnquiry = {
  name: string;
  email: string;
  phone: string;
  company: string;
  intentLabel: string;
  message: string;
};

const bodyKeys = [
  "name",
  "email",
  "phone",
  "company",
  "intent",
  "message",
  "company_website",
] as const;

function stripControls(value: string, keepLineBreaks: boolean) {
  const pattern = keepLineBreaks
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
    : /[\u0000-\u001F\u007F]/g;
  return value.replace(pattern, "");
}

export function sanitizeContactBody(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return value;

  const record = value as Record<string, unknown>;
  const next: Record<string, unknown> = {};

  for (const key of bodyKeys) {
    if (!(key in record)) continue;
    const field = record[key];
    next[key] =
      typeof field === "string"
        ? stripControls(field, key === "message")
        : field;
  }

  return next;
}

export function honeypotTripped(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const website = (value as { company_website?: unknown }).company_website;
  if (website == null || website === "") return false;
  if (typeof website !== "string") return true;
  return website.trim().length > 0;
}

export function parseContactRequest(
  value: unknown,
): { ok: true; enquiry: ContactEnquiry } | { ok: false } {
  const parsed = contactRequestSchema.safeParse(value);
  if (!parsed.success) return { ok: false };

  const intent = projectIntents.find((item) => item.id === parsed.data.intent);
  if (!intent) return { ok: false };

  return {
    ok: true,
    enquiry: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      company: parsed.data.company,
      intentLabel: intent.label,
      message: parsed.data.message,
    },
  };
}
