// import * as dbtools from "@/hooks/db_tools"

export async function GET(
    req: Request,
    res: Response
) {
    try {
        // const data = await dbtools.DESC("users");
        return new Response("hi", { status: 200 });
        // res.status(200).send({messsage: "hi there"});
    }
    catch (error) {
        // return new Response(null, { status: 500 });
        return new Response("bonjour", { status: 500 });
    }
}