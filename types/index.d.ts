import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type MainNavPresets = {
  GettingStarted: Boolean
  Solutions: Boolean
  Documentation: Boolean
}

export type AccountNavPresets = {
  AccountBadge: Boolean
  DashboardBadge: Boolean
  UserMenu: Boolean
  TeamMenu: Boolean
}

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type DocsConfig = {
  presets: MainNavPresets[]
  accountPresets: AccountNavPresets[]
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  presets: MainNavPresets[]
  accountPresets: AccountNavPresets[]
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  presets: MainNavPresets[]
  accountPresets: AccountNavPresets[]
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type AdminConfig = {
  presets: MainNavPresets[]
  accountPresets: AccountNavPresets[]
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type AccountConfig = {
  presets: MainNavPresets[]
  accountPresets: AccountNavPresets[]
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }
