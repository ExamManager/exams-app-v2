import { AdminConfig } from "types"

export const adminConfig: AdminConfig = {
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
          href: "/prices",
          disabled: true,
        },
      ],
  sidebarNav: [
        {
          title: "Dashboard",
          href: "/jesus",
          icon: "home",
        },
        // {
        //   title: "Exams",
        //   href: "/dashboard/exams",
        //   icon: "logo",
        // },
        {
          title: "Database",
          href: "/jesus/db",
          icon: "database",
        }
  ]
}
