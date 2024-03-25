import { CardSkeleton } from "@/components/card-skeleton"
import { AccountHeader } from "@/components/header"
import { AccountShell } from "@/components/shell"

export default function AccountBillingLoading() {
  return (
    <AccountShell>
      <AccountHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </AccountShell>
  )
}
