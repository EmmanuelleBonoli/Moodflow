'use client'

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useUserStore} from "@/stores/userStore";
import {toast} from "sonner";
import {AuthFacade} from "@/services/facade/auth.facade";

export default function AuthGuard({children}: { children: React.ReactNode }) {
    const router: AppRouterInstance = useRouter();
    const {userName} = useUserStore();
    const authFacade = new AuthFacade();

    useEffect((): void => {
        (async (): Promise<void> => {
            const token: string | null = localStorage.getItem('accessToken');
            if (!token) {
                router.push('/auth');
                return;
            }
            if (!userName) {
                try {
                    await authFacade.refreshTokenAndStores();
                } catch (error) {
                    toast("vos données n'ont pu être récupérées, merci de vous reconnecter");
                    router.push('/auth');
                }
            }
        })();
    }, []);

    return <>{children}</>;
}