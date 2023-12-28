import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function useUser ( ) {
    const [user, setUser] = useState<User>();
    const router = useRouter();

    useEffect(() => {
        fetch('/api/users/me')
        .then((res) => res.json())
        .then((data) => {
            if (!data.ok) {
                return router.replace('/account/login');
            } 
            setUser(data.profile);
        })
    }, [router])

    return user;
}