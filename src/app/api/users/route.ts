// import withHandler from '@/app/lib/server/withHandler';
import { db } from 'prisma/db';
import { hash } from 'bcrypt';
import { ResponseType, hashPassword } from '@/app/lib/server/utils';
import { NextRequest, NextResponse } from 'next/server';

 export async function POST(
  req: NextRequest,
  res: NextResponse<ResponseType>
) {

  const data = await req.json();
  const { name, email, password } = data;

  const newPassword = await hash(password, 10);

  const userExists = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (userExists) {
    return NextResponse.json({ ok: false, message: 'already exists' });
  }
  const user = await db.user.create({
    data: {
      name,
      email,
      password: newPassword,
    },
  });

  if (!user) {
    return NextResponse.json({
      ok: false,
      message: 'Sorry, not successful.',
    });
  }

  return NextResponse.json({
    ok: true,
    message: 'Successful',
    user,
  });
}

export async function GET(req: NextRequest) {
  console.log("===========================");
  const data = await req.json();
  const { params: id } = data;
  console.log(id);

  return NextResponse.json({
    ok: true,
    message: "yes"
  })
}

