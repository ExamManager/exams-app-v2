import { Metadata } from "next"
import Image from "next/image"
import { AccountHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { AccountShell } from "@/components/shell"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import { ExamCreateButton } from "@/components/exam-create-button"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Exams",
  description: "Create and manage exams.",
}
import * as React from "react"
import { Exam } from "@/types/exams"

export default async function DemoPage() {
  const currentUser = await getCurrentUser();
  const data: Exam[] = await db.exam.findMany({
    where: {
      authorId: currentUser?.id,
    },
  });
  const exams2: Exam[] = [];
  const exams1: Exam[] = [];
  for (let i = 0; i < data.length; i++) {
    if (new Date(data[i].end) < new Date()) {
      exams1.push(data[i]);
    } else
      exams2.push(data[i]);
    }
return (
  <>
    <AccountShell>
      <AccountHeader heading="Exams" text="Create and manage exams.">
        <ExamCreateButton />
      </AccountHeader>
      <div className="hidden flex-col md:flex divide-y divide-border rounded-md border">
        <div className="flex-1 pt-4">
          <div className="container mx-auto">
            {/* <UpcomingDataTable data2={exams2 as Exam[]} /> */}
          </div>
        </div>
        <div className="flex-1 pt-4">
        </div>
      </div>
    </AccountShell>
  </>
)
}