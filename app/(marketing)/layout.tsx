import Link from "next/link"

import { marketingConfig, marketingCta } from "@/config/marketing"
import { AUTH_DISABLED } from "@/lib/auth-disabled"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { getCurrentUser } from "@/lib/session"
import { UserAccountNav } from "@/components/user-account-nav"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser()
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} preset={marketingConfig.presets[0]} />
          <nav className="flex items-center space-x-4">
            <Link
              href={
                AUTH_DISABLED
                  ? marketingCta.header.href
                  : user
                    ? "/account"
                    : marketingCta.header.href
              }
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              {AUTH_DISABLED
                ? marketingCta.header.label
                : user
                  ? "Account"
                  : marketingCta.header.label}
            </Link>
            {!AUTH_DISABLED && user && (
              <UserAccountNav
                user={{
                  name: user.name,
                  image: user.image,
                  email: user.email,
                }}
              />
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
