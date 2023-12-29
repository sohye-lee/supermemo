import { NextRequest, NextResponse } from 'next/server';
import { db } from 'prisma/db';

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { name, type, topic, categoryId, userEmail } = data;

  console.log('data I received: ', data);
  const newMemo = await db.memo.create({
    data: {
      name,
      type,
      topic,
      category: {
        connect: {
          id: parseInt(categoryId),
        },
      },
      user: {
        connect: {
          email: userEmail,
        },
      },
    },
  });

  if (!newMemo) {
    return NextResponse.json({
      ok: false,
      message: 'Something went wrong. Please retry.',
    });
  }

  return NextResponse.json({
    ok: true,
    message: 'Success!',
    memo: newMemo,
  });
}
