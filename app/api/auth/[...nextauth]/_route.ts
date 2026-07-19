import NextAuth from "next-auth"
import { NextResponse } from "next/server"

import { AUTH_DISABLED } from "@/lib/auth-disabled"
import { authOptions } from "@/lib/auth"

function authDisabledResponse() {
  return NextResponse.json(
    { error: "Authentication is disabled on this portfolio showcase." },
    { status: 503 }
  )
}

const handler = NextAuth(authOptions)

export const GET = AUTH_DISABLED ? authDisabledResponse : handler
export const POST = AUTH_DISABLED ? authDisabledResponse : handler
