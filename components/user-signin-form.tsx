"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Icons } from "@/components/icons"
import OTP from "./opt-input"
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isWaitingOTP, setIsWaitingOTP] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>("")
  const router = useRouter()

  async function onSubmit(data: FormData) {
    console.log("signin")
    setIsLoading(true)
    setEmail(data.email)
    try {
      const signInResult = await signIn("email", {
        email: data.email.toLowerCase(),
        redirect: false,
      })

      console.log(signInResult)
      setIsLoading(false)

      if (!signInResult?.ok) {
        return toast.error(
          "Something went wrong.", {
          description: "Your sign in request failed. Please try again.",
        },
        )
      }

      if (signInResult?.error) {
        router.push("/register?email=" + data.email)
        return toast.error(
          "You are not registered", {
          description: "Please create an account to continue.",
        },
        )
      }

      setIsWaitingOTP(true)

      return toast.success(
        "Check your email", {
        description: "We've sent you a 6-digit code. Be sure to check your spam too.",
      },
      )
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      return toast.error(
        "Network error", {
        description: "There was a problem with the network. Please try again.",
      },
      )
    }
  }

  return (
    <>
      {!isWaitingOTP ?
        <div className={cn("grid gap-6", className)} {...props}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading || isGitHubLoading}
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* <div className="flex gap-2"> */}
                <button type="submit" className={cn(buttonVariants())} disabled={isLoading} >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In with Email
                </button>
               {/* <button type="submit" className={cn(buttonVariants())} disabled={isLoading} >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In One Time Password
                </button> */}
              {/* </div> */}
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
            onClick={() => {
              setIsGitHubLoading(true)
              signIn("github")
            }}
            disabled={isLoading || isGitHubLoading}
          >
            {isGitHubLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.gitHub className="mr-2 h-4 w-4" />
            )}{" "}
            Github
          </button>
        </div>
        :
        <div className="">
          <OTP email={email} />
          <div className="">
            <button className={cn(buttonVariants({ variant: "link" }))} onClick={() => setIsWaitingOTP(false)}>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Change Email
            </button>
          </div>

        </div>

      }
    </>
  )
}
