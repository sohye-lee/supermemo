import { NextRequest, NextResponse } from 'next/server';
import { db } from 'prisma/db';

export async function GET(req: NextRequest, context: any) {
  const {
    params: { id },
  } = context;

  if (!id) {
    return NextResponse.redirect('/');
  }

  const memo = await db.memo.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      category: true,
    },
  });

  if (!memo) {
    return NextResponse.json({
      ok: false,
      message: 'No memo found.',
    });
  }

  return NextResponse.json({
    ok: true,
    message: 'Success.',
    memo,
  });
}

export async function PUT(req: NextRequest, context: any) {
  const {
    params: { id },
  } = context;
  const data = await req.json();
  const { name, type, topic, categoryId, userEmail } = data;

  if (!id) {
    return NextResponse.redirect('/');
  }
  const memo = await db.memo.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!memo) {
    return NextResponse.json({
      ok: false,
      message: 'No memo found.',
    });
  }

  console.log('data I got to update memo: ', data);
  const updatedMemo = await db.memo.update({
    where: {
      id: +id!,
    },
    data: {
      name,
      type,
      topic,
      category: {
        connect: {
          id: parseInt(categoryId),
        },
      },
      //   user: {
      //     connect: {
      //       email: userEmail,
      //     },
      //   },
    },
  });

  if (!updatedMemo) {
    return NextResponse.json({
      ok: false,
      message: 'Unsuccessful.',
      memo: updatedMemo,
    });
  }

  return NextResponse.json({
    ok: true,
    message: 'Successfully updated!',
    memo: updatedMemo,
  });
}
