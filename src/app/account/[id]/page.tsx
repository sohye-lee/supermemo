import Hero from '@/components/ui/hero'
import { useParams } from 'next/navigation'
import { db } from 'prisma/db';
import AccountImage from 'public/image/bg-gradient-2.jpg'

export default async function AccountPage(props:any) {
    const { id} = props.params
    const user = await db.user.findUnique({
        where: {
            id 
        }
    })
    return (
        <>
        <Hero title={`Welcome Back, ${user?.name}`} alt="" img={AccountImage} description="" />
        </>
    )
}