import AuthGuard from "@/guards/AuthGuard";
import {PropsWithChildren} from "react";
import SidebarMenu from "@/app/dashboard/components/sibebar-menu";

export default function DashboardLayout({children}: PropsWithChildren) {
    return (
        <AuthGuard>
            <div className="min-h-screen flex bg-background">
                <SidebarMenu/>
                <main className="flex-1 flex flex-col items-center py-10 px-4"
                >{children}</main>
            </div>
        </AuthGuard>
    );
}