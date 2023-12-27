import { NextRequest, NextResponse } from "next/server";
import { db } from "prisma/db";

export async function GET (req: NextRequest, context:any) {
  const { params: { id } } = context;

  console.log(id);

  const user = await db.user.findUnique({
    where: {
      id 
    }
  });
  
  if (!user) {
    return NextResponse.json({
      ok: false,
      message: 'Sorry, not successful.',
    });
  }

  return NextResponse.json({
    ok: true,
    message: 'Successful',
    user,
  });
}