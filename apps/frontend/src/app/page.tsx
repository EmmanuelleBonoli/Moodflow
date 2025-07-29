import Link from 'next/link'
import {Calendar, TrendingUp, Zap} from 'lucide-react'
import Logo from "@/components/shared/Logo";

export default function Home() {
    return (
        <div className="section-container">

            <div className="text-center mb-16">
                <Logo/>
                <h1 className="text-5xl font-bold app-title-gradient mb-6">
                    MoodFlow
                </h1>

                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    L&#39;assistant personnel intelligent qui adapte votre planning à votre humeur
                    pour une productivité optimale et un bien-être au quotidien.
                </p>

                <div className="flex gap-4 justify-center">
                    <Link
                        href="/dashboard"
                        className="btn-primary"
                    >
                        Commencer
                    </Link>
                    <Link
                        href="/auth"
                        className="btn-secondary"
                    >
                        Se connecter
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="card">
                    <Calendar className="w-12 h-12 text-indigo-500 mb-4"/>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Planning Intelligent</h3>
                    <p className="text-gray-600">
                        L&#39;IA analyse votre humeur et propose un planning personnalisé
                        pour maximiser votre productivité.
                    </p>
                </div>

                <div className="card">
                    <TrendingUp className="w-12 h-12 text-purple-500 mb-4"/>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Analytics Avancés</h3>
                    <p className="text-gray-600">
                        Suivez vos patterns de productivité et découvrez vos moments
                        de performance optimale.
                    </p>
                </div>

                <div className="card">
                    <Zap className="w-12 h-12 text-teal-500 mb-4"/>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Adaptation Continue</h3>
                    <p className="text-gray-600">
                        L&#39;assistant apprend de vos habitudes pour affiner ses
                        recommandations jour après jour.
                    </p>
                </div>
            </div>
        </div>
    );
}
