"use client";

import {useEffect} from "react";
import {ReadonlyURLSearchParams, useRouter, useSearchParams} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function OAuth2Success() {
    const router: AppRouterInstance = useRouter();
    const params: ReadonlyURLSearchParams = useSearchParams();
    const token: string | null = params.get("token");

    useEffect(() => {
        if (token) {
            localStorage.setItem("accessToken", token);
            router.replace("/dashboard");
        }
    }, [token, router]);

    return (
        <div className="flex items-center justify-center h-screen">
            <p>Connexion en cours...</p>
        </div>
    );
}