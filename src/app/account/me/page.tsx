'use client';
import useUser from '@/app/lib/client/useUser';
import Container from '@/components/ui/container';
import Hero from '@/components/ui/hero';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AccountImage from 'public/image/bg-gradient-2.jpg';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function AccountPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [me, setMe] = useState<any>();

  useEffect(() => {
    fetch('/api/users/me')
      .then((res) => res.json())
      .then((data) => setMe(data?.profile));

    if (!session?.user) {
      router.push('/account/login');
    }
  }, [setMe]);

  return (
    <>
      <Hero
        title={`Welcome Back, ${me?.name}`}
        alt=""
        img={AccountImage}
        description=""
      />
      <Container wide="narrow">
        <form action="" className="w-full flex flex-col gap-3">
          <div className="mb-3 flex items-center gap-3">
            <p className=" font-medium w-32 ">Username</p>
            {me?.name}
          </div>
          <div className="mb-3 flex items-center gap-3">
            <p className=" font-medium w-32">Account Type</p>
            {me?.accounts
              ? me?.accounts?.map((a: any) => <span key={a.id}>{a.type}</span>)
              : 'Member'}
          </div>
          <div className="mb-3 flex items-center gap-3">
            <p className=" font-medium w-32">Email</p>
            {me?.email}
          </div>
          <div className="mb-3 flex items-center gap-3">
            <p className=" font-medium w-32">Member Since</p>
            {me?.createdAt ? format(me?.createdAt, 'LLLL d, yyyy') : ''}
          </div>
        </form>
      </Container>
    </>
  );
}
