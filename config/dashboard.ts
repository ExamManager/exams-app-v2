import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  presets: [
        {
          GettingStarted: true,
          Solutions: true,
          Documentation: true,
        },
      ],
  accountPresets: [
    {
      AccountBadge: false,
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
  sidebarNav: [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: "home",
        },
        {
          title: "Exams",
          href: "/dashboard/exams",
          icon: "logo",
        },
  ]
}
