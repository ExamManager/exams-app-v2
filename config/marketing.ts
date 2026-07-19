import { MarketingConfig } from "types"
import { AUTH_DISABLED } from "@/lib/auth-disabled"

export const marketingConfig: MarketingConfig = {
  presets: [
        {
          GettingStarted: true,
          Solutions: true,
          Documentation: true,
        },
      ],
  accountPresets: [
    {
      AccountBadge: true,
      DashboardBadge: true,
      UserMenu: true,
      TeamMenu: true,
    },
  ],
  mainNav: [
        {
          title: "Pricing",
          href: "/pricing",
          disabled: false,
        },
      ],
}

/** Primary marketing CTAs when signup/login is showcase-disabled. */
export const marketingCta = AUTH_DISABLED
  ? {
      primary: { href: "/docs", label: "View Docs" },
      header: { href: "/docs", label: "Docs" },
    }
  : {
      primary: { href: "/login", label: "Get Started" },
      header: { href: "/login", label: "Login" },
    }
