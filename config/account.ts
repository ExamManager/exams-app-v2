import { AccountConfig } from "types"

export const accountConfig: AccountConfig = {
  presets: [
    {
      GettingStarted: true,
      Solutions: false,
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
