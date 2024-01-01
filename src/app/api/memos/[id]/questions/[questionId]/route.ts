import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { db } from 'prisma/db';

export async function GET(req: NextRequest, context: any) {
  const {
    params: { questionId },
  } = context;

  const question = await db.question.findUnique({
    where: {
      id: parseInt(questionId),
    },
  });

  if (!question) {
    return NextResponse.json({
      ok: false,
      message: 'Not found',
    });
  }

  return NextResponse.json({
    ok: true,
    messsage: 'Question successfully loaded.',
    question,
  });
}

export async function PUT(req: NextRequest, context: any) {
  const {
    params: { questionId },
  } = context;
  const data = await req.json();
  const { question, answer, image, memoId, userEmail } = data;

  const updatedQuestion = await db.question.update({
    where: {
      id: +questionId!,
    },
    data: {
      question: question,
      answer: answer,
      image: image,
    },
  });

  if (!updatedQuestion) {
    return NextResponse.json({
      ok: false,
      message: 'Unsuccessful.',
    });
  }

  return NextResponse.json({
    ok: true,
    message: 'Successfully updated!',
    question: updatedQuestion,
  });
}

export async function DELETE(req: NextRequest, context: any) {
  const {
    params: { questionId },
  } = context;

  const deletedQuestion = await db.question.delete({
    where: {
      id: +questionId!,
    },
  });

  if (!deletedQuestion) {
    return NextResponse.json({
      ok: false,
      message: 'Unsuccessful.',
    });
  }

  return NextResponse.json({
    ok: true,
    message: 'Successfully deleted!',
    question: deletedQuestion,
  });
}
