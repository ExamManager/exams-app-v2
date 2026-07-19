import Link from "next/link"
import type { Metadata } from "next"
import {
  BarChart3,
  CalendarClock,
  LayoutGrid,
  Rows3,
  Timer,
  Users,
} from "lucide-react"

import { marketingCta } from "@/config/marketing"
import { pricingPlans } from "@/config/pricing"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Announcement } from "@/components/announcement"
import { buttonVariants } from "@/components/ui/button"
import { HeroImage } from "@/components/hero-image"

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: siteConfig.description,
}

const productFeatures = [
  {
    title: "Classroom exam timer",
    description:
      "Run a clear, full-screen timer so every room stays on the same clock from start to finish.",
    icon: Timer,
  },
  {
    title: "Multi-exam sessions",
    description:
      "Time up to several exams at once — useful when different subjects or rooms finish at different times.",
    icon: LayoutGrid,
  },
  {
    title: "Exam timetables",
    description:
      "Build and share exam schedules so staff and students know when and where each paper runs.",
    icon: CalendarClock,
  },
  {
    title: "Seating plans",
    description:
      "Create seating layouts for exam halls and keep room assignments consistent across sessions.",
    icon: Rows3,
  },
  {
    title: "Student analytics",
    description:
      "Review results and trends with analytical tools built for educators, not just raw score dumps.",
    icon: BarChart3,
  },
  {
    title: "Subject presets",
    description:
      "Save custom presets per subject so recurring exams start with the right defaults every time.",
    icon: Users,
  },
]

async function getGitHubStars(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/ExamManager/exams-app-v2",
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_ACCESS_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}` }
            : {}),
        },
        next: {
          revalidate: 60,
        },
      }
    )

    if (!response?.ok) {
      return null
    }

    const json = await response.json()

    return parseInt(json["stargazers_count"]).toLocaleString()
  } catch {
    return null
  }
}

export default async function IndexPage() {
  const stars = await getGitHubStars()

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Announcement />
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            ExamManager V2
          </h1>
          <p className="max-w-[42rem] text-xl font-medium leading-normal sm:text-2xl sm:leading-8">
            Coordinate exam timing and classroom management with less friction.
          </p>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Run classroom timers, plan multiple exams, build timetables and
            seating layouts, and review results — built for educators who need
            the room to stay calm when the clock starts.
          </p>
          <div className="space-x-4">
            <Link
              href={marketingCta.primary.href}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              {marketingCta.primary.label}
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Auth &amp; billing disabled — demo and docs only.
          </p>
        </div>
      </section>

      <HeroImage />

      <section
        id="features"
        className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Built for exam day
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Everything you need to time, plan, and manage exams — from a single
            classroom to a full school session.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {productFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="relative overflow-hidden rounded-lg border bg-background p-2"
              >
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <Icon className="h-10 w-10" strokeWidth={1.5} />
                  <div className="space-y-2">
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section
        id="pricing"
        className="container space-y-6 py-8 md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Simple pricing
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            From personal use to school-wide planning — same plans as ExamManager
            V1.
          </p>
        </div>
        <div className="mx-auto grid max-w-[64rem] gap-4 sm:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-lg border bg-background p-6 text-center",
                plan.popular && "border-primary"
              )}
            >
              {plan.badge ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                  {plan.badge}
                </span>
              ) : null}
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p className="mt-2 font-heading text-4xl font-bold">
                {plan.priceLabel}
                <span className="text-sm font-normal text-muted-foreground">
                  /mo
                </span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {plan.features[0]}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href="/pricing"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            See full pricing
          </Link>
        </div>
      </section>

      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Open source portfolio
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            ExamManager V2 is an open-source portfolio rebuild of the exam
            timing product — explore the code, docs, and UI without signup or
            checkout.{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
          {stars && (
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-foreground"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent"></div>
                <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
                  {stars} stars on GitHub
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>
    </>
  )
}
