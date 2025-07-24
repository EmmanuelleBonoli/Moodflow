"use client";

import {useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";

export default function OAuth2Success() {
    const router = useRouter();
    const params = useSearchParams();
    const token = params.get("token");

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