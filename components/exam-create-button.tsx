"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "sonner"
import { Icons } from "@/components/icons"
import { NewExam } from "@/types/exams"

interface ExamCreateButtonProps extends ButtonProps {}

export function ExamCreateButton({
  className,
  variant,
  ...props
}: ExamCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const newE: NewExam = {
      title: "Maths Paper 2",
      start: new Date(),
      duration: 75,
    }

    const response = await fetch("/api/exams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newE,
      }),
    })

    setIsLoading(false)
    if (response?.ok) {
      router.refresh()
    }

    if (!response?.ok) {
      if (response.status === 401) {
        return toast.error(
          "Unauthorized", {
            description: "You must be logged in to create an exam.",
            action: {
              label: "Login",
              onClick: () => router.push("/login"),
            },
          },
        )
      }

      return toast.error(
        "Something went wrong.", {
          description: "Your new Exam was not created. Please try again."
        },
      )
    } else {
      return toast.success(
        "Exam created.", {
          description: "Your new Exam was created.",
        },
      )
    }
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.logo className="mr-2 h-4 w-4" />
      )}
      New Exam
    </button>
  )
}
