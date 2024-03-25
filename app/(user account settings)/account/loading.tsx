import { AccountHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/post-item"
import { AccountShell } from "@/components/shell"

export default function AccountLoading() {
  return (
    <AccountShell>
      <AccountHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </AccountHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
      </div>
    </AccountShell>
  )
}
