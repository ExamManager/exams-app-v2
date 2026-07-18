# ExamManager v2

Taxonomy-era ExamManager — a Next.js 14 exam management app built with Prisma, NextAuth, Stripe subscriptions, and Contentlayer docs/blog.

This is an earlier generation of ExamManager (forked from the open-source Taxonomy starter and adapted for exam coordination). Prefer [exams-app-v3](https://github.com/ExamManager/exams-app-v3) for the current product direction.

## Stack

- [Next.js](https://nextjs.org/) App Router + Server Components
- [Prisma](https://www.prisma.io/) ORM
- [NextAuth.js](https://next-auth.js.org/) authentication
- [Stripe](https://stripe.com/) subscriptions
- [Resend](https://resend.com/) email
- [Radix UI](https://www.radix-ui.com/) + [Tailwind CSS](https://tailwindcss.com/)
- [Contentlayer](https://www.contentlayer.dev/) + MDX (docs & blog)
- [PostHog](https://posthog.com/) analytics
- TypeScript + Zod

## Features

- Exam dashboard and content editing
- Auth (GitHub OAuth + email)
- Free / Pro billing via Stripe
- Marketing pages, docs, and blog
- OG image generation

## Getting started

1. Install dependencies:

```sh
pnpm install
```

2. Copy env and fill in values:

```sh
cp .env.example .env
```

3. Generate the Prisma client and run migrations against your database, then start the app:

```sh
pnpm prisma generate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Related repos

- [exams-app-v1](https://github.com/ExamManager/exams-app-v1) — first ExamManager app
- [exams-app-v2](https://github.com/ExamManager/exams-app-v2) — this repo
- [exams-app-v3](https://github.com/ExamManager/exams-app-v3) — latest ExamManager app
- [exams-landing](https://github.com/ExamManager/exams-landing) — waitlist / landing page

## License

Licensed under the [MIT License](./LICENSE.md).
