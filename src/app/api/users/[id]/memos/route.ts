import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { db } from 'prisma/db';

export async function GET(req: NextRequest, context: any) {
  const {
    params: { id },
  } = await context;

  const session = await getServerSession();
  if (!session) {
    return {
      redirect: {
        destination: '/account/login',
      },
    };
  }
  const memos = await db.memo.findMany({
    where: {
      userId: id,
    },
    include: {
      category: true,
      likes: true,
      questions: true,
    },
  });

  if (!memos) {
    return NextResponse.json({
      ok: true,
      message: 'Unsuccessful',
    });
  }

  console.log('memos sending...', memos);

  return NextResponse.json({
    ok: true,
    message: 'Successfully loaded!',
    memos,
  });
}
