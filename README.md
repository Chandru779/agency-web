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

Set `NEXT_PUBLIC_SITE_URL` in production (see `.env.example`) for canonical URLs, sitemap, and Open Graph.

## Contact email

`/start` and the lead dialog post to `POST /api/contact`. The server sends the enquiry with [Resend](https://resend.com). Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY` — server-only API key. Never use a `NEXT_PUBLIC_` name.
- `CONTACT_FROM_EMAIL` — sender Resend is allowed to use. Until `miqode.com` is verified, set this to `onboarding@resend.dev`. After verification, use an address on that domain such as `info@miqode.com`. Do not put `hello.miqode@gmail.com` here.
- `CONTACT_TO_EMAIL` — only while the sender is `onboarding@resend.dev`. Set it to the email on your Resend account. After the domain is verified, remove it. Enquiries then go to `hello.miqode@gmail.com`.

While those values are missing, `npm run dev` returns a configuration error and does not treat the enquiry as sent. In production the visitor sees a generic failure instead of that setup detail.
