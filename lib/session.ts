import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions)
    return session?.user
  } catch {
    // Missing auth env / DB should not take down public marketing pages.
    return undefined
  }
}
