import { NextRequest, NextResponse } from 'next/server';
import { db } from 'prisma/db';

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { userId, questionId } = data;

  const existingKnow = await db.know.findFirst({
    where: {
      userId,
      questionId,
    },
  });

  if (existingKnow) {
    return NextResponse.json({
      ok: false,
      message: 'You already know this one!',
    });
  }

  const know = await db.know.create({
    data: {
      userId,
      questionId,
    },
  });

  if (!know) {
    return NextResponse.json({
      ok: false,
      message: 'Unsuccessful.',
    });
  }

  return NextResponse.json({
    ok: true,
    message: 'Successfully added.',
    know,
  });
}
