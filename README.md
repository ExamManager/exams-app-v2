# ExamManager v2

Next.js exam management app — exam dashboard, auth, Stripe billing, and MDX docs/blog.

Built on the open-source Taxonomy starter and adapted for exam coordination. Prefer [exams-app-v3](https://github.com/ExamManager/exams-app-v3) for the current product direction.

## Stack

- Next.js 14 App Router and React
- TypeScript, Tailwind CSS, Radix UI
- Prisma ORM
- NextAuth.js
- Stripe subscriptions
- Resend email
- Contentlayer + MDX
- PostHog analytics
- Yarn

## Features

- Exam dashboard and content editing
- Auth (GitHub OAuth + email)
- Free / Pro billing via Stripe
- Marketing pages, docs, and blog
- OG image generation

## Local development

```bash
yarn install
cp .env.example .env
yarn prisma generate
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` and fill in values. Required groups typically include:

- `NEXT_PUBLIC_APP_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
- `DATABASE_URL`
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` (optional)
- `RESEND_API_KEY`, Stripe keys, PostHog keys as needed

## Commands

| Command | Purpose |
| --- | --- |
| `yarn dev` | Development server |
| `yarn build` | Production build |
| `yarn start` | Serve production build |
| `yarn lint` | ESLint |
| `yarn turbo` | Dev with Turbopack |

## Related repositories

| Repo | Role |
| --- | --- |
| [exams-landing](https://github.com/ExamManager/exams-landing) | Waitlist / marketing landing |
| [exams-app-v1](https://github.com/ExamManager/exams-app-v1) | Vue 3 exam timer |
| [exams-app-v3](https://github.com/ExamManager/exams-app-v3) | T3 / Drizzle SaaS rewrite |

## License

MIT — see [LICENSE.md](./LICENSE.md).
