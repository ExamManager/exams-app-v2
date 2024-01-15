import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  presets: [
    {
      GettingStarted: true,
      Solutions: false,
      Documentation: true,
    },
  ],
  mainNav: [
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Posts",
      href: "/account",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/account/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/account/settings",
      icon: "settings",
    },
  ],
}
