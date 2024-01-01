'use client';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function useUser() {
  const router = useRouter();
  // const { data, error } = useSWR(
  //   `${process.env.NEXTAUTH_URL}/api/users/me`,
  //   fetcher
  // );
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetch('/api/users/me')
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          return router.replace('/account/login');
        }
        setUser(data.profile);
        console.log('Success');
      })
      .catch((err) => console.log(err));
  }, [router]);
  // useEffect(() => {
  //   if (data && !data.ok) {
  //     router.replace('/account/login');
  //   }
  //   if (data) {
  //     console.log(data);
  //   }
  // }, [data, router]);

  // return { user: data?.profile, isLoading: !error && !data };
  return { user: user };
}
