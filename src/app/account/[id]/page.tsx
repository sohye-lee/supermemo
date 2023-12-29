// 'use client';
import Container from '@/components/ui/container';
import Hero from '@/components/ui/hero'
import { useSession } from 'next-auth/react';
import { notFound, useParams } from 'next/navigation'
import { db } from 'prisma/db';
import AccountImage from 'public/image/bg-gradient-2.jpg'

export default async function UserPage(props:any) {
    const {params: {id}} = props;

    const user = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${props.params.id}`, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json()).then((res) => res.user).catch(err => console.log(err));

    // console.log(user2);
    return (
        <>
        <Hero title={user?.name || ""} alt="" img={AccountImage} description="" />
        <Container wide="narrow" narrow={true}>
            <div className="mb-3 flex items-center">
                {user?.name}   
            </div>
        </Container>
        </>
    )
}