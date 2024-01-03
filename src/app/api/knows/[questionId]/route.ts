import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { db } from 'prisma/db';

export async function GET(req: NextRequest, context: any) {
  const questionId = parseInt(context.params.questionId);
  const session = await getServerSession();
  const userId = session?.user.id;

  const know = await db.know.findFirst({
    where: {
      userId,
      questionId,
    },
  });

  if (!know) {
    return NextResponse.json({
      ok: true,
      message: "You don't know this one.",
    });
  }

  return NextResponse.json({
    ok: true,
    message: 'Successfully added.',
    know,
  });
}

export async function DELETE(req: NextRequest, context: any) {
  // const questionId = parseInt(context.params.questionId);
  const { questionId, userId } = await req.json();
  try {
    const deletedKnow = await db.know.deleteMany({
      where: {
        userId,
        questionId,
      },
    });

    return NextResponse.json({
      ok: true,
      message: 'Successfully unknowed.',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      ok: false,
      message: 'Unsuccessful',
    });
  }
}
