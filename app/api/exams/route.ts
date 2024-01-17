// Import your database connection and the NewExamToAdd type
import { db } from "@/lib/db";
import { NewExam } from "@/types/exams";
import { Prisma } from "@prisma/client";

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { json } from "stream/consumers";

// Define the POST function
export async function POST(req: Request, res: Response) {
    try {
        const NewExamToAdd: NewExam = await req.json();
        console.log("New Exam to add:")
        console.log(NewExamToAdd)
        const session = await getServerSession(authOptions);

        if (!session?.user || !session?.user.email) {
            return new Response("Unauthorized", { status: 401 });
        }
        const exam = await db.exam.create({
            data: {
                title: String(NewExamToAdd.title),
                start: NewExamToAdd.start || '',
                end: NewExamToAdd.end || calculateEndTime(NewExamToAdd.start, Number(NewExamToAdd.duration || 0), Number(NewExamToAdd.readingtime) || 0, Number(NewExamToAdd.extratime) || 0),
                duration: Number(NewExamToAdd.duration || 0),
                readingtime: Number(NewExamToAdd.readingtime || 0),
                extratime: Number(NewExamToAdd.extratime || 0),
                authorId: session.user.id,
                reminders: JSON.stringify(NewExamToAdd.reminders),
            },
        });
        console.log("Exam created")
        console.log(exam)
        return new Response(JSON.stringify(exam), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(`Exam Error: ${error.message}`, { status: 400 })
    }
}

export async function GET(req: Request, res: Response) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || !session?.user.email) {
            return new Response("Unauthorized", { status: 401 });
        }
        const exams = await db.exam.findMany({
            where: {
                authorId: session.user.id,
            },
        });
        return new Response(JSON.stringify(exams), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(`Exam Error: ${error.message}`, { status: 400 })
    }
}

export async function DELETE(req: Request, res: Response) {
    // const response = await fetch(`/api/exams/${examId}`, {
    //        method: "DELETE",
    //    })

    try {
        const session = await getServerSession(authOptions);

        if (!session?.user || !session?.user.email) {
            return new Response("Unauthorized", { status: 401 });
        }
        const examId = req.url.split("/").pop();
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

function calculateEndTime(start: Date, duration: number, readingtime: number, extratime: number) {
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + duration + readingtime + extratime);
    return end;
}

