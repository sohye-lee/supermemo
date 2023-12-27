// import withHandler from '@/app/lib/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from 'prisma/db';
import { hash } from 'bcrypt';
import { ResponseType } from '@/app/lib/server/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  res: NextResponse<ResponseType>
  //   req: NextApiRequest,
  //   res: NextApiResponse<ResponseType>
) {
  const data = await req.json();
  console.log(data);
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
  console.log(user);

  return NextResponse.json({
    ok: true,
    message: 'Successful',
    user,
  });

  //   try {
  //     const { name, email, password } = req.body;
  //     const newPassword = await hash(password, 10);

  //     const userExists = await db.user.findUnique({
  //       where: {
  //         email: email,
  //       },
  //     });
  //     if (userExists) {
  //       res.status(405).json({ ok: false });
  //     }
  //     const user = await db.user.create({
  //       data: {
  //         name,
  //         email,
  //         password: newPassword,
  //       },
  //     });
  //     res.json({ ok: true, user });
  //   } catch (error) {
  //     console.log(error);
  //     return res?.status(500).json({ ok: false, error });
  //   }
}

// export async function GET(request: Request, response: Response) {
//   return NextResponse.json({});
// }
