import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(
    req: Request
) {
    return new Response("please reply", { status: 200 });
}
