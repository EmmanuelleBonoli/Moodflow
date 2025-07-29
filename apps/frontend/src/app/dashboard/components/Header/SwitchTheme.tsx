"use client";

import {Moon, Sun} from "lucide-react"
import {useTheme} from "next-themes"

export default function SwitchTheme() {
    const {setTheme, resolvedTheme} = useTheme();

    const isDark = resolvedTheme === "dark";

    return (
        <button
            className="p-2 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Changer le thème"
            type="button"
        >
            <span className="relative flex items-center justify-center">
            <Sun
                className={
                    "w-5 h-5 text-gray-600 transition-all duration-300 " +
                    (isDark
                        ? "opacity-100 scale-100 rotate-0"
                        : "opacity-0 scale-0 -rotate-90")
                }
            />
            <Moon
                className={
                    "w-5 h-5 text-gray-600 absolute transition-all duration-300 " +
                    (!isDark
                        ? "opacity-100 scale-100 rotate-0"
                        : "opacity-0 scale-0 rotate-90")
                }
            />

        </span>
        </button>
    )
}