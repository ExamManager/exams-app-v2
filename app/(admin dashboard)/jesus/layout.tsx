import Link from "next/link"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

import { adminConfig } from "@/config/admin"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { getCurrentUser } from "@/lib/session"
import { UserAccountNav } from "@/components/user-account-nav"
import { AccountNav } from "@/components/nav"

import { accountConfig } from "@/config/account"
import TeamSwitcher from "@/components/team-switcher"
interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={adminConfig.mainNav} preset={adminConfig.presets[0]} />
          <nav className="flex items-center space-x-4">
            {adminConfig.accountPresets[0].AccountBadge ? 
            <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "px-4"
            )}
          >
            {user ? "Account" : "Login"}
          </Link> : null}
            {adminConfig.accountPresets[0].TeamMenu ? <TeamSwitcher
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}/> : null}
            {adminConfig.accountPresets[0].UserMenu ?
            (user && (
              <UserAccountNav 
                user={{
                  name: user.name,
                  image: user.image,
                  email: user.email,
                }}
              />
            )) : null}
          </nav>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <AccountNav items={adminConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}
