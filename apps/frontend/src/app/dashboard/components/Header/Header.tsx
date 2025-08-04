'use client';

import {Brain, Settings, User} from 'lucide-react';
import SwitchTheme from "./SwitchTheme";
import {useUserStore} from "@/stores/userStore";
import {useEffect, useState} from "react";

export function Header() {
    const {userName} = useUserStore()
    const [showGreeting, setShowGreeting] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowGreeting(false);
        }, 8000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <header
            className="backdrop-blur-md border-b border-indigo-200/50 sticky top-0 z-50 max-w-7xl mx-auto px-6 py-4">
            <nav className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div
                        className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white"/>
                    </div>
                    <hgroup>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            MoodFlow
                        </h1>
                        {showGreeting && (
                            <p className="text-sm text-gray-500 transition-opacity duration-500">
                                Bonjour {userName} ! ✨
                            </p>
                        )}
                    </hgroup>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Settings className="w-5 h-5 text-gray-600"/>
                    </button>
                    <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                        <User className="w-5 h-5 text-gray-600"/>
                    </button>
                    <SwitchTheme/>
                </div>
            </nav>
        </header>
    );
}