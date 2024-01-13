import { MarketingConfig } from "types"

export const marketingConfig: MarketingConfig = {
  presets: [
        {
          GettingStarted: true,
          Solutions: true,
          Documentation: true,
        },
      ],
  mainNav: [
        {
          title: "Pricing",
          href: "/prices",
          disabled: true,
        },
      ],
}
