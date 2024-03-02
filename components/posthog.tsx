"use client"
import posthog from "posthog-js"
import { useEffect } from "react"


export function UserIdenifying({ user }) {
    useEffect(() => {
        if (user && user.email) {
            posthog.identify(user.email), {
                email: user.email,
                name: user.name,
                image: user.image
            }
        }
    }, [user]);
    return null;
}