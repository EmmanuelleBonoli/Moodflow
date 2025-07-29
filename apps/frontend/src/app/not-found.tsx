'use client';

import Link from 'next/link'
import {Home, ArrowLeft} from 'lucide-react'
import {useRouter} from 'next/navigation'
import Logo from "@/components/shared/Logo";

export default function NotFound() {
    const router = useRouter()

    return (
        <div className="section-container flex flex-col items-center justify-center">

            <Logo/>

            <h1 className="text-[6rem] font-extrabold app-title-gradient">
                404
            </h1>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Page introuvable
            </h2>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl text-center">
                Désolé, la page que vous cherchez n’existe pas ou n’est plus disponible.
                <br/>
                Retournez à l’accueil ou à la page précédente.
            </p>

            <div className="flex gap-4 justify-center">
                <Link
                    href="/"
                    className="btn-primary"
                >
                    <Home className="w-5 h-5"/>
                    Accueil
                </Link>
                <button
                    onClick={() => router.back()}
                    className="btn-secondary"
                >
                    <ArrowLeft className="w-5 h-5"/>
                    Retour
                </button>
            </div>
        </div>
    )
}