'use client';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function useUser() {
  const router = useRouter();
    const { data, error } = useSWR('/api/users/me');
  // const [user, setUser] = useState<User>();

  // useEffect(() => {
  //   fetch('/api/users/me')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (!data.ok) {
  //         return router.replace('/account/login');
  //       }
  //       setUser(data.profile);
  //     });
  // }, [router]);
    useEffect(() => {
      if (data && !data.ok) {
        router.replace('/account/login');
      }
    }, [data, router]);

  return { user: data?.profile, isLoading: !error && !data };
}
