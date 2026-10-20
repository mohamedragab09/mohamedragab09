'use client';

import { useAuth } from "@/components/context/auth-context";
import { getProfile } from "@/lib/services/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AdminContent({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { setUser } = useAuth();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await getProfile();

                setUser(data.user);
                setLoading(false);
            } catch(err) {
                console.error(err);
                router.replace('/login');
            }
        }

        checkAuth();
    }, [router, setUser]);

    if(loading) {
        return <p>Loading...</p>;
    }

  return children;
}
