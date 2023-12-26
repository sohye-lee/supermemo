// import withHandler from '@/app/lib/server/withHandler';
import {NextApiRequest, NextApiResponse} from 'next';
import { db } from 'prisma/db';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';



export async function POST (request: Request) {
    const data = await request.json();
    const { name, email, password} = data;

    const newPassword = await hash(password, 10);

    const userExists = await db.user.findUnique({
        where: {
            email: email
        }
    });
    if (userExists) {
        return NextResponse.json({
            message: 'This email lready exists!'
        })
    }
    const user = await db.user.create({
        data: {
            name,
            email,
            password: newPassword,
        }
    })

    if (!user) {
        return NextResponse.json({
            message: "Sorry, not successful."
        })
    }
    console.log(user);

    return NextResponse.json({
        message: 'Successful',
        user: user
    })
}

export async function GET (request: Request, response: Response) {
    
    return NextResponse.json({
    
    })
}

