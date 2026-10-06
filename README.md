# miqode

Software engineering agency website. Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript

Set `NEXT_PUBLIC_SITE_URL` in production (see `.env.example`) for canonical URLs, sitemap, and Open Graph. The public site is `https://miqode.in`.

## Search

Search files live next to the routes they describe:

- `src/lib/seo.ts` — titles, the list of public pages, and structured data
- `src/app/sitemap.ts` — `/sitemap.xml`
- `src/app/robots.ts` — `/robots.txt`
- `src/app/manifest.ts` — the site name for browsers
- `src/components/seo/json-ld.tsx` — the homepage schema tag

Point `miqode.in` at this deployment, then in [Google Search Console](https://search.google.com/search-console):

1. Add the property `https://miqode.in`.
2. Copy the HTML-tag verification value into `GOOGLE_SITE_VERIFICATION` and redeploy.
3. Submit `https://miqode.in/sitemap.xml`.

A new domain can take days or weeks to show up for the name “miqode”. Broad phrases such as “best agency” are not something a title tag can win on its own. `www` and `miqode.com` redirect to `https://miqode.in` when those hosts reach this app.

## Contact email

`/start` and the lead dialog post to `POST /api/contact`. The server sends the enquiry with [Resend](https://resend.com). Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY` — server-only API key. Never use a `NEXT_PUBLIC_` name.
- `CONTACT_FROM_EMAIL` — sender Resend is allowed to use. Until `miqode.com` is verified, set this to `onboarding@resend.dev`. After verification, use an address on that domain such as `info@miqode.com`. Do not put `hello.miqode@gmail.com` here.
- `CONTACT_TO_EMAIL` — only while the sender is `onboarding@resend.dev`. Set it to the email on your Resend account. After the domain is verified, remove it. Enquiries then go to `hello.miqode@gmail.com`.

While those values are missing, `npm run dev` returns a configuration error and does not treat the enquiry as sent. In production the visitor sees a generic failure instead of that setup detail.
