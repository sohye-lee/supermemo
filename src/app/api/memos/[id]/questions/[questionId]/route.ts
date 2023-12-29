import { NextRequest } from "next/server";
import { db } from "prisma/db";

export async function GET(req:NextRequest, context:any) {
    const { params: { id }} = context;

    // const questions = await db.question.findMany({
    //     where: {
    //         memoId: 
    //     }
    // })
}