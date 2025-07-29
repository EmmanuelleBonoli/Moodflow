import AuthGuard from "@/guards/AuthGuard";
import {PropsWithChildren} from "react";
import {Header} from "./components/Header/Header";

export default function DashboardLayout({children}: PropsWithChildren) {
    return (
        <AuthGuard>
            <div className="min-h-screen from-indigo-50 via-white to-purple-50">
                <Header/>
                {children}
            </div>
        </AuthGuard>
    );
}