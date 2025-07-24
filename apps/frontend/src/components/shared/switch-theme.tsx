"use client";

import {Moon, Sun} from "lucide-react"
import {useTheme} from "next-themes"

export default function SwitchTheme() {
    const {setTheme, resolvedTheme} = useTheme();

    const isDark = resolvedTheme === "dark";

    return (
        <button
            className={isDark ? "btn-secondary" : "btn-primary"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Changer le thème"
            type="button"
        >
            <span className="relative flex items-center justify-center">
            <Sun
                className={
                    "transition-all duration-300 " +
                    (isDark
                        ? "opacity-100 scale-100 rotate-0"
                        : "opacity-0 scale-0 -rotate-90")
                }
            />
            <Moon
                className={
                    "absolute transition-all duration-300 " +
                    (!isDark
                        ? "opacity-100 scale-100 rotate-0"
                        : "opacity-0 scale-0 rotate-90")
                }
            />

        </span>
        </button>
    )
}