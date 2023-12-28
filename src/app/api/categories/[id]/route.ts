import {NextRequest, NextResponse } from "next/server";
import { db } from "prisma/db";

export async function PUT (req: NextRequest, context:any) {
    const data = await req.json();
    const { name, note} = data;
    const { params: { id } } = context;

 
    const existingCategory = await db.category.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!existingCategory) {
        return NextResponse.json({
            ok: false, 
            message: "No category found."
        })
    }

    const updatedCategory = await db.category.update({
        where: {
            id: existingCategory.id,
        },
        data: {
            name: name != "" ? name : existingCategory.name,
            note: note
        }
    })

    return NextResponse.json({
        ok: true, 
        message: "Updated",
        category: updatedCategory,
    })
}

export async function DELETE (req: NextRequest, context:any) {
    const {params: {id}} = context;
    const category = await db.category.delete({
        where: {
            id: parseInt(id)
        }
    })

    return NextResponse.json({
        ok: true,
        message: "Deleted",
    })
}