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

import { DataTable } from "../../../../components/exams/upcoming-exams"
import { Exam } from "@/types/exams"
import { get } from "http"

export default async function DemoPage() {
  const exams: Exam[] = await db.exam.findMany({
    where: {
        authorId: getCurrentUser().id,
    },
});
  
  return (
    <>
      <AccountShell>
        <AccountHeader heading="Exams" text="Create and manage exams.">
          <ExamCreateButton />
        </AccountHeader>
        <div className="md:hidden">
          <Image
            src="/examples/dashboard-light.png"
            width={1280}
            height={866}
            alt="Dashboard"
            className="block dark:hidden"
          />
          <Image
            src="/examples/dashboard-dark.png"
            width={1280}
            height={866}
            alt="Dashboard"
            className="hidden dark:block"
          />
        </div><div className="hidden flex-col md:flex divide-y divide-border rounded-md border">
          <div className="flex-1 pt-2  ">
            <div className="container mx-auto ">
              <DataTable data={exams as Exam[]} />
            </div>
          </div>
        </div>
      </AccountShell>
    </>
  )
}