import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import "./globals.css";
import {PropsWithChildren} from "react";
import {ThemeProvider} from "next-themes";
import SwitchTheme from "@/components/shared/switch-theme";
import {Toaster} from "sonner";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'MoodFlow - Assistant Personnel IA',
    description: 'Organisez votre journée selon votre humeur avec l\'intelligence artificielle',
}

export default function RootLayout({children}: PropsWithChildren) {
    return (
        <>
            <html lang="fr" suppressHydrationWarning>
            <body className={`min-h-screen bg-app-gradient ${inter.className}`}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <header className="flex justify-end"><SwitchTheme/></header>
                {children}
                <Toaster/>
            </ThemeProvider>
            </body>
            </html>
        </>
    )
}