import Link from "next/link"

import { marketingCta } from "@/config/marketing"
import { customPlanNote, pricingPlans } from "@/config/pricing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export const metadata = {
  title: "Pricing",
}

export default function PricingPage() {
  return (
    <section className="container flex flex-col gap-8 py-8 md:max-w-[72rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 text-center md:max-w-[58rem]">
        <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Prices that fit every need
        </h1>
        <p className="mx-auto max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Plans for personal exam timing up through school-wide planning,
          timetables, and seating.
        </p>
      </div>

      <div className="grid w-full gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "relative flex flex-col rounded-lg border bg-background p-6",
              plan.popular && "border-primary shadow-md"
            )}
          >
            {plan.badge ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                {plan.badge}
              </span>
            ) : null}
            <div className="mb-6 space-y-2 text-center">
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <div className="flex items-end justify-center gap-1">
                <span className="font-heading text-5xl font-bold">
                  {plan.priceLabel}
                </span>
                <span className="pb-1 text-sm text-muted-foreground">
                  /month
                </span>
              </div>
            </div>
            <ul className="mb-8 flex flex-1 flex-col gap-3 text-sm text-muted-foreground">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Icons.check className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href={marketingCta.primary.href}
              className={cn(
                buttonVariants({
                  variant: plan.popular ? "default" : "outline",
                  size: "lg",
                }),
                "w-full"
              )}
            >
              Demo only
            </Link>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        {customPlanNote}
      </p>

      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-2 rounded-lg border border-dashed p-6 text-center">
        <p className="leading-normal text-muted-foreground sm:leading-7">
          ExamManager V2 is a portfolio demo.{" "}
          <strong className="text-foreground">
            Auth and billing are disabled — pricing is illustrative only.
          </strong>{" "}
          Explore the product docs instead of checkout.
        </p>
        <Link
          href="/docs"
          className={cn(
            buttonVariants({ variant: "link" }),
            "mx-auto h-auto p-0"
          )}
        >
          View documentation
        </Link>
      </div>
    </section>
  )
}
