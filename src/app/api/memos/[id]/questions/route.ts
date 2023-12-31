import { NextRequest, NextResponse } from 'next/server';
import { db } from 'prisma/db';

export async function POST(req: NextRequest, context: any) {
  const {
    params: { id },
  } = context;
  const data = await req.json();
  const { question, answer, image, userEmail } = data;
  const newQuestion = await db.question.create({
    data: {
      question,
      answer,
      image,
      memo: {
        connect: {
          id: parseInt(id),
        },
      },
      user: {
        connect: {
          email: userEmail,
        },
      },
    },
  });

  if (!newQuestion) {
    return NextResponse.json({
      ok: false,
      message: 'Unsuccessful.',
    });
  }

  return NextResponse.json({
    ok: true,
    message: 'Successfully!',
    question: newQuestion,
  });
}

export async function GET(req: NextRequest, context: any) {
  const {
    params: { id },
  } = context;
  const questions = await db.question.findMany({
    where: {
      memoId: parseInt(id),
    },
  });

  if (!questions) {
    return NextResponse.json({
      ok: false,
      message: 'Unsuccessful.',
    });
  }

  return NextResponse.json({
    ok: true,
    message: 'Successfully!',
    questions,
  });
}
