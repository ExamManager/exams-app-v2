"use client"
import posthog from "posthog-js"
import { useEffect } from "react"


export function UserIdenifying({ user }) {
    useEffect(() => {
        if (user && user.email) {
            posthog.identify(user.email);
        }
    }, [user]);
    return null;
}