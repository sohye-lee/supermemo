import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { db } from "prisma/db";

export async function GET (req: NextRequest, context:any) {
    const { data: session } = useSession();
    if (!session) {
        redirect('/account/login');
    }
    
    const profile = await db.user.findUnique({
        where: {
            email:  session?.user?.email!,
        }
    });

    if (!profile) {
        return NextResponse.json({
            ok: false,
            message: "not existing"
        })
    }

    return NextResponse.json({
        ok: true,
        message: 'your profile',
        profile
    })
     
}