'use client';
import Container from '@/components/ui/container';
import Hero from '@/components/ui/hero'
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import {  useRouter } from 'next/navigation'
import { db } from 'prisma/db';
import AccountImage from 'public/image/bg-gradient-2.jpg'
import { useEffect, useState } from 'react';

interface MeProps extends User {

}

export default async function AccountPage() {
    const {data: session} = useSession();
    const router = useRouter();
    if (!session) {
        router.push('/account/login');
    }
    const [me, setMe] = useState<MeProps>();

    useEffect(() => {
           fetch(`/api/users/${session?.user?.id}`, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((res) => res.json()).then((res) => res.user).then(user => setMe(user)).catch(err => console.log(err));
    }, [session?.user?.id, session])

    return (
        <>
        <Hero title={`Welcome Back,${me?.name}`} alt="" img={AccountImage} description="" />
        <Container full={false} narrow={true}>
            <form action="" className='w-full flex flex-col gap-3'>
            <div className="mb-3 flex items-center gap-3">
                <p className=" font-medium ">Username</p>
                {me?.name}
                    
                </div>
                {me?.email}
        
            </form>

 
     
        </Container>
        </>
    )
}