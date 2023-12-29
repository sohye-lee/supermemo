import { NextRequest, NextResponse } from "next/server";
import { db } from "prisma/db";

export async function GET ( req:NextRequest, context:any) {
    const { params: { id }} = context;

    if (!id) {
        return NextResponse.redirect('/');
    }

    const memo = await db.memo.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!memo) {
        return NextResponse.json({
            ok: false,
            message: "No memo found.",
        })
    }

    return NextResponse.json({
        ok: true, 
        message: "Success.",
        memo
    })
    
}