"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { AuthDisabledNotice } from "@/components/auth-disabled-notice"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <AuthDisabledNotice />
      <fieldset disabled className="min-w-0 grid gap-6">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                value=""
                readOnly
                autoComplete="off"
              />
            </div>
            <button className={cn(buttonVariants())} disabled type="submit">
              Sign In with Email
            </button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          disabled
        >
          <Icons.gitHub className="mr-2 h-4 w-4" /> Github
        </button>
      </fieldset>
    </div>
  )
}
