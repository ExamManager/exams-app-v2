import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { userNameSchema } from "@/lib/validations/user"

const routeContextSchema = z.object({
  params: z.object({
    examId: z.string(),
  }),
})

export async function DELETE(
    req: Request,
    context: z.infer<typeof routeContextSchema>
  ) {
    // deletes exam
    // const response = await fetch(`/api/exams/${examId}`, {
    //        method: "DELETE",
    //    })
    try {
        const { params } = routeContextSchema.parse(context)
        const session = await getServerSession(authOptions);

        if (!session?.user || !session?.user.email) {
            return new Response("Unauthorized", { status: 401 });
        }
        const examId = params.examId;
        const exam = await db.exam.delete({
            where: {
                id: examId,
            },
        });
        return new Response(JSON.stringify(exam), { status: 200 });
    } catch (error) {
        console.error(error);
        console.log(error);
        return new Response(`Exam Error: ${error.message}`, { status: 400 })
    }
  }