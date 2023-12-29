import useUser from '@/app/lib/client/useUser';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { db } from 'prisma/db';

export async function GET(req: NextRequest, context: any) {
  const { data: session } = useSession();
  if (!session) {
    redirect('/account/login');
  }

  const profile = await db.user.findUnique({
    where: {
      email: session?.user?.email!,
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

  console.log(profile);
  return NextResponse.json({
    ok: true,
    message: 'your profile',
    profile,
  });
}
