import { z } from "zod";

import { site } from "@/lib/site";

export const projectIntents = [
  {
    id: "product",
    label: "New product",
    hint: "From an idea to a version you can ship.",
    brief:
      "We need help taking a product from idea to something we can ship and run.",
  },
  {
    id: "business",
    label: "Business software",
    hint: "Replace a process that still lives in inboxes.",
    brief:
      "We need software around a process that still runs on spreadsheets and inboxes.",
  },
  {
    id: "ai",
    label: "AI and automation",
    hint: "Give a real workflow a clear job to do.",
    brief:
      "We want AI applied to a real workflow, with a clear job for the system to do.",
  },
  {
    id: "modernize",
    label: "Modernize a system",
    hint: "Strengthen software that already runs the business.",
    brief:
      "We have software that already runs the business, and it needs a stronger foundation.",
  },
] as const;

export type InquiryValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  intent: string;
  message: string;
};

export function inquirySchema(variant: "page" | "dialog") {
  return z.object({
    name:
      variant === "page"
        ? z.string().trim().min(2, "Add your name.")
        : z.string().trim(),
    email: z.email("Use a valid email address."),
    phone: z
      .string()
      .trim()
      .min(8, "Add a phone number we can reach.")
      .max(24, "That phone number looks too long."),
    company: z.string().trim().max(80),
    intent: z.string().min(1, "Choose what you need."),
    message: z
      .string()
      .trim()
      .min(8, "Add a short note about the project.")
      .max(2000),
  });
}

export function intentById(id: string) {
  return projectIntents.find((item) => item.id === id) ?? projectIntents[0];
}

export function isStockBrief(message: string) {
  const trimmed = message.trim();
  return projectIntents.some((item) => item.brief === trimmed);
}

export function inquiryMailto(values: InquiryValues) {
  const intent = intentById(values.intent);
  const lines = [
    values.name.trim() ? `Name: ${values.name.trim()}` : null,
    `Email: ${values.email.trim()}`,
    `Phone: ${values.phone.trim()}`,
    values.company.trim() ? `Company: ${values.company.trim()}` : null,
    `Project: ${intent.label}`,
    "",
    values.message.trim(),
  ].filter((line): line is string => line !== null);

  const subject = encodeURIComponent(`Project request — ${intent.label}`);
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}
