"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
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
        return toast({
          title: "You are not signed in.",
          description: "Please sign in to create a new Exam.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      })
    } else {
      return toast({
        title: "Exam created.",
        description: "Your new Exam was created.",
        variant: "default",
      })
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
