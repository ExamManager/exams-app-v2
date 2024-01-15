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

export const metadata: Metadata = {
  title: "Exams",
  description: "Create and manage exams.",
}

import { Payment, columns } from "../../../../components/exams/planned-columns"
import DataTable from "../../../../components/exams/planned-data"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728edf2f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728sd52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "7d8ed52f",
      amount: 100,
      status: "pending",
      email: "g@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

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
        </div>
        <div className="hidden flex-col md:flex divide-y divide-border rounded-md border">
          <div className="flex-1 space-y-4 p-4 pt-6">
            <div className="container mx-auto py-10">
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </AccountShell>
    </>
  )
}