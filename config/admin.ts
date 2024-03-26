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
      TeamMenu: false,
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
          title: "Overview",
          href: "/jesus/db",
          icon: "database",
        },
        {
            title: "Users",
            href: "/jesus/users",
            icon: "user",
        },
        {
            title: "Schools",
            href: "/jesus/schools",
            icon: "school",
        }
  ]
}
