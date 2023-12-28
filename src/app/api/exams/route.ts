import { NextRequest, NextResponse } from 'next/server';
import { db } from 'prisma/db';

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { name, type, topic, categoryId, userId } = data;

  const newExam = await db.exam.create({
    data: {
      name,
      type,
      topic,
      category: {
        connect: {
          id: categoryId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  if (!newExam) {
    return NextResponse.json({
      ok: false,
      message: 'Something went wrong. Please retry.',
    });
  }

  return NextResponse.json({
    ok: true,
    message: 'Success!',
    exam: newExam,
  });
}
