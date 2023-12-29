// import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "prisma/db";

export async function POST (req: NextRequest, res: NextResponse<ResponseType>) {
    const data = await req.json();
    const { name, note } = data;
    console.log("data I got: ", data)

    // const session = await getServerSession();
    // const {data: session} = useSession();
    // if (!data) {
    //     return NextResponse.json({
    //         ok: false,
    //         message: "Need name!"
    //     })
    // }

    // if (!session || session?.user?.type != "admin") {
    //     return NextResponse.json({
    //         dk: false, 
    //         message: "Access denied", 
    //     }, {status: 400})
    // }

    const newCategory = await db.category.create({
        data: {
            name,
            note,
        }
    })

    if (!newCategory) {
        return NextResponse.json({
            ok: false, 
            message: "Something whent wrong.."
        })
    }

    return NextResponse.json({
        ok: true, 
        message: "Successfully created!",
        category: newCategory,
    })
}

export async function GET (req: NextRequest, res: NextResponse) {
    const allCategories = await db.category.findMany();

    if (allCategories.length == 0) {
        return NextResponse.json({
            ok: false,
            message: "Not Found"
        }, {status: 200})
    }

    return NextResponse.json({
        ok: true, 
        message: "All categories loaded",
        categories: allCategories
    })
}
