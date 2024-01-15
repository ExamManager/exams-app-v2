import * as React from "react"

import { cn } from "@/lib/utils"

interface AccountShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AccountShell({
  children,
  className,
  ...props
}: AccountShellProps) {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  )
}
