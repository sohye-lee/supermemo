import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { db } from 'prisma/db';

export async function GET(req: NextRequest, context: any) {
  const serverSession = await getServerSession();
  if (!serverSession?.user) {
    redirect('/account/login');
  }

  const profile = await db.user.findUnique({
    where: {
      email: serverSession?.user?.email || ""
    },
    include: {
      accounts: true,
    },
  });

  if (!profile) {
    return NextResponse.json({
      ok: false,
      message: 'not existing',
    });
  }

  return NextResponse.json({
    ok: true,
    message: 'your profile',
    profile,
  });
}
