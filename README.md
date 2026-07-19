# ExamManager v2

> **Deprecated portfolio showcase.** Auth and billing are disabled in production.
> Prefer [exams-app-v3](https://github.com/ExamManager/exams-app-v3) for the current product direction.

Next.js exam management app — exam dashboard, auth, Stripe billing, and MDX docs/blog.

Built on the open-source Taxonomy starter and adapted for exam coordination.

## Showcase status

This deployment is a **read-only marketing demo**. Sign-in / sign-up APIs return `503`, and login/register pages show an unavailable notice.

Public pages that should work cleanly:

- `/` — marketing home
- `/pricing` — illustrative pricing
- `/blog` — blog
- `/docs` — documentation
- `/privacy`, `/terms` — placeholder legal pages (demo content)

Protected app areas (`/dashboard`, `/account`, `/editor`) redirect to login, which is intentionally non-functional in showcase mode.

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
- Auth (GitHub OAuth + email) — **disabled in showcase**
- Free / Pro billing via Stripe — **disabled in showcase**
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

To build without a full secrets set (CI / portfolio):

```bash
SKIP_ENV_VALIDATION=1 yarn build
```

## Environment

Copy `.env.example` and fill in values. Required groups typically include:

- `NEXT_PUBLIC_APP_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
- `DATABASE_URL`
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` (optional)
- `RESEND_API_KEY`, Stripe keys, PostHog keys as needed

`NEXTAUTH_SECRET` must come from the environment when auth is re-enabled — there is no hardcoded demo secret.

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
