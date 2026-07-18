"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, getCsrfToken } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Icons } from "@/components/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const searchParams = useSearchParams()
  const initialEmailRef = React.useRef(searchParams?.get('email') || '')
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: initialEmailRef.current,
    },
  })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const csrfToken = await getCsrfToken()

    const response = await fetch(
      `/api/auth/callback/email?email=${encodeURIComponent(email)}&token=${code}`
    );


    const signInResult = await signIn("signup", {
      email: data.email.toLowerCase(),
      redirect: false,
      intent: "registration",
    })

    setIsLoading(false)

    console.log(signInResult)

    if (!signInResult?.ok) {
      
      return toast.error(
        "Something went wrong.", {
          description: "Your request failed. Please try again.",
        },
      )
    }

    return toast.success(
      "Check your email", {
        description: "We sent you a login link. Be sure to check your spam too.",
      },
    )
  }


  return (
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
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up with Email
          </button>
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
  )
}
