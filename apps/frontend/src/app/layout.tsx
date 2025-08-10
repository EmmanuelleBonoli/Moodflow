import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import "./globals.css";
import {PropsWithChildren} from "react";
import {ThemeProvider} from "next-themes";
import {Toaster} from "sonner";
import {QueryProvider} from "@/providers/QueryProvider";

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
            <QueryProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster/>
                </ThemeProvider>
            </QueryProvider>
            </body>
            </html>
        </>
    )
}