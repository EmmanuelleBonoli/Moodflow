'use client';

import Logo from "@/components/shared/logo";
import {useState} from "react";
import LoginForm from "./components/login-form";
import RegisterForm from "./components/register-form";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="section-container text-center">
            <Logo/>
            <h1 className="text-5xl font-bold app-title-gradient mb-6">MoodFlow</h1>
            <div className="flex gap-4 justify-center">
                <button
                    className={isLogin ? "btn-primary" : "btn-secondary"}
                    onClick={() => setIsLogin(true)}
                    type="button"
                >
                    Se connecter
                </button>
                <button
                    className={
                        isLogin ? "btn-secondary" : "btn-primary"
                    }
                    onClick={() => setIsLogin(false)}
                    type="button"
                >
                    Créer un compte
                </button>
            </div>
            <div className="flex flex-col items-center justify-center mt-8">
                {isLogin ? <LoginForm/> : <RegisterForm/>}
            </div>
        </div>
    );
}