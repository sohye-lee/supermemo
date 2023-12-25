import { NextResponse } from 'next/server';
import { db } from 'prisma/db';
import { hash } from 'bcrypt';
import { generateName } from '@/util';
import * as z from 'zod';

const userSchema = z.object({
  name: z.string(),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

export async function GET() {
  return NextResponse.json({ success: true });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = userSchema.parse(body);

    let finalName = '';
    // if name is empty, replace with random name
    if (!name || name.length < 1) {
      finalName = generateName();
    } else {
      finalName = name;
    }

    // check if email already exists
    const userExists = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return NextResponse.json(
        { user: null, message: 'User with this email already exists.' },
        { status: 409 }
      );
    }

    // create crypted password
    const protectedPassword = await hash(password, 10);

    // create user
    const newUser = await db.user.create({
      data: {
        name: finalName,
        email,
        password: protectedPassword,
      },
    });

    const { password: newPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: 'Successfully registered!' },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    );
  }
}
