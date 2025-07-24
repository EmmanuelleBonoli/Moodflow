'use client'

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function AuthGuard({children}: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const token: string | null = localStorage.getItem('accessToken');
        if (!token) {
            router.push('/auth/login');
            return;
        }
    }, [router]);

    return <>{children}</>;
}