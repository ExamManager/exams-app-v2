import * as dbtools from "@/hooks/db_tools"

export async function GET(
    req: Request,
    res: Response
) {
    try {
        

        const d = await dbtools.DELETE("test", "testint = 14")
        // const data = await dbtools.DESC("users");
        return new Response(JSON.stringify(await d), { status: 202 });
        // res.status(200).send({messsage: "hi there"});
    }
    catch (error) {
        // return new Response(null, { status: 500 });
        return new Response(JSON.stringify(error), { status: 500 });
    }
}