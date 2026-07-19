import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"

import { AUTH_DISABLED } from "@/lib/auth-disabled"
import { authOptions } from "@/lib/auth"

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  if (AUTH_DISABLED) {
    return res.status(503).json({
      error: "Authentication is disabled on this portfolio showcase.",
    })
  }

  return NextAuth(authOptions)(req, res)
}
