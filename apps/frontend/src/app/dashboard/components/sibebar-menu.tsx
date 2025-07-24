import {Home, BarChart2, User, Settings} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function SidebarMenu() {
    const navItems = [
        {icon: <Home/>, label: "Accueil"},
        {icon: <BarChart2/>, label: "Statistiques"},
        {icon: <User/>, label: "Profil"},
        {icon: <Settings/>, label: "Paramètres"},
    ];

    return (
        <aside className="hidden md:flex flex-col w-56 bg-card border-r border-border py-6 px-4 gap-6">
            <h2 className="text-lg font-bold text-primary mb-8 pl-2">MoodFlow</h2>
            <nav className="flex flex-col gap-2">
                {navItems.map((item, idx) => (
                    <Button
                        key={idx}
                        variant="ghost"
                        size="lg"
                        className="justify-start text-base"
                    >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                    </Button>
                ))}
            </nav>
        </aside>

    )
}