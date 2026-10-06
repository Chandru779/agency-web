---
name: miqode-ui
description: Improves the miqode marketing site without changing its theme, palette, logo, or positioning. Use when editing layout, spacing, typography, borders, the about page, the start-a-project page, studio contact details, or the lead request dialog.
---

# miqode UI

Keep the existing idea: a quiet editorial studio site. Ink, cream, and teal. Mono eyebrows. Bordered cards. Dark hero and footer. Do not restyle the brand, invent clients, or add testimonials.

## Before editing

Read the page and the shared pieces it uses: `Section`, `PageHero`, `Container`, `Eyebrow`, `site` in `src/lib/site.ts`. Match what is already on the page. Change spacing, type, and missing production content. Do not delete a section because it feels spare.

## Type and spacing

- Eyebrows use `Eyebrow` or `eyebrowClass`: 11px mono, medium, `tracking-[0.18em]`, uppercase. Brand teal on light surfaces. `text-teal-300/80` on the dark hero and closing band.
- Do not use type smaller than 11px. Service chips are sentence case, `text-xs` or `text-sm`, with `px-2.5 py-1` inside a `border-border` chip.
- Body copy is `text-sm` or `text-base` with `leading-relaxed`. Do not introduce one-off sizes such as `text-[15px]` or `text-[10px]`.
- Inner pages pad the top only: `pt-4 pb-0 sm:pt-6 lg:pt-6`. Do not add bottom padding on a section that sits under a page hero. Homepage bands use `homeBandSpacing` (`py-12 sm:py-14 lg:py-16`) so neighboring sections do not collide. Do not add further margins on top of that. Prefer `divide-y divide-border` between rows. Do not add `border-y` on a list that already sits under a bordered hero or section edge.
- The closing CTA and the footer are one dark surface. The enter wave stays short (`h-[clamp(3.25rem,7vw,5rem)]`). CTA padding is `pt-16 pb-8 sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-10` so the headline clears the curve and the button sits close to the footer. Footer padding is `pt-8 pb-6 sm:pt-10 sm:pb-8` with `border-t border-white/10`. Do not stack large bottom and top padding between them.
- Neighboring bands need a separator. A muted band (`bg-muted/45`) should not sit directly on another muted band. Use the existing border or background change.
- Cards share one padding step: `p-6` or `px-5 py-5 sm:px-6`. The 1px grid (`gap-px border border-border bg-border`) stays.

## Content

- Facts live in `src/lib/site.ts`: email `hello.miqode@gmail.com`, phone `+91 63618 52500`, hours, response time, Nagarbhavi studio address, founder years, co-founder years, head of engineering years, and team size. Do not invent a name, a client logo, or a quote.
- The founder is Chandrashekar. Co-founder and Head of Engineering are separate roles; describe them by role until a name is provided. Head of Engineering is ex-Flipkart. The team is 5–10 people.
- Practice-project asides ("what we will not do") should be rewritten as client-facing copy. Keep the honesty: no fictional case studies.

## Requests

- "Start a project" links to `/start`, not `mailto:`.
- The lead dialog in `LeadDialog` opens once, about eight seconds after the first view, and not on `/start`. It fades and rises in; it does not appear instantly. Dismissal is stored in `sessionStorage` under `miqode-lead-dismissed`. Keep it a short panel: a 2-column intent grid with each option’s label and hint, then email, phone, and the note. Do not show the studio phone number in the dialog.
- The request note is prefilled from `projectIntents` in `src/lib/inquiry.ts`. Required contact fields are email and phone. Name is required on `/start` and omitted from the lead dialog. Submitting posts to `POST /api/contact`, which sends the enquiry through Resend. Do not fall back to `mailto:` or show a success state when Resend is not configured.
