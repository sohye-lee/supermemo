import withHandler from '@/app/lib/server/withHandler';
import {NextApiRequest, NextApiResponse} from 'next';
import { db } from 'prisma/db';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';

async function handler(req: NextApiRequest, res: NextApiResponse) {
 
    const { name, email, password } = req.body;

    const newPassword = await hash(password, 10);

    const newUser = await db.user.create({
        data: {
            name,
            email,
            password: newPassword,
        }
    })

    if (!newUser) {
        res.status(405).json('something went wrong');
    }

    return res.status(201).redirect(`/`);
 
}

export default withHandler("POST", handler);