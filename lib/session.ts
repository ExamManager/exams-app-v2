import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { db } from "./db"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}

export async function getAdmin() {
  const user = await getCurrentUser()
  if (!user) {
    return null
  }
  const admin = await db.user.findMany({
    where: {
      id: user.id,
    },
    select: {
      admin: true,
  },
  })
  return admin[0].admin
}
