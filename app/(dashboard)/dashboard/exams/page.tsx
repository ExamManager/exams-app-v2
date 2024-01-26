
import { Metadata } from "next"
import { AccountHeader } from "@/components/header"
import { ExamCreateButton} from "@/components/exam-create-button"
import { AccountShell } from "@/components/shell"

import { columns } from "../../../../components/table/components/columns"
import { DataTable } from "../../../../components/table/components/data-table"
import {  } from "../../../../components/table/data/schema"


import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

import { Exam } from "@/types/exams"
import { ExamCreateFromFavouritesButton } from "@/components/exam-create-from-favourite-button"

export const metadata: Metadata = {
  title: "Exams",
  description: "Create and manage exams.",
}

const exams = [
  {
    "id": "TASK-8782",
    "title": "Chemistry Paper 1",
    "level": "sl",
    "times": "both",
    "subject": "physics",
    "paper": "1"
  },
  {
    "id": "TASK-7878",
    "title": "Maths Ai Paper 1",
    "level": "hl",
    "times": "reading",
    "subject": "biology",
    "paper": "1"
  },
  {
    "id": "TASK-2878",
    "title": "English Paper 3",
    "level": "none",
    "times": "reading",
    "subject": "english",
    "paper": "3"
  },
]

async function getexams() {
  // use db.exams to get data
  
}

export default async function TaskPage() {
  
  return (
    <>
      <AccountShell>
        <AccountHeader heading="Exams" text="Create and manage exams.">
          <div className="flex space-x-2" >
          <ExamCreateFromFavouritesButton variant={"outline"} />
          <ExamCreateButton />
          </div>
        </AccountHeader>
        <div className="hidden flex-col md:flex divide-y divide-border rounded-md border">
          <div className="flex-1 py-6">
            <div className="container mx-auto">
               <DataTable data={exams} columns={columns} />
            </div>
          </div>
        </div>
      </AccountShell>
    </>
  )
}