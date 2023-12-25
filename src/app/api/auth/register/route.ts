import { db } from 'prisma/db';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    console.log({ email, password });

    const handledPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        password: handledPassword,
        email,
        name,
      },
    });
    redirect('/');
  } catch (err: unknown) {
    console.log(err);
  }

  return NextResponse.json({ message: 'Successfully registered!' });
}
