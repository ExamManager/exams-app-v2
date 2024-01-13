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
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
