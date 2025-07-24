import {Metadata} from 'next';
import {BarChart2, Calendar, Smile} from "lucide-react";
import {Button} from "@/components/ui/button";

export const metadata: Metadata = {
    title: 'Dashboard - MoodFlow',
    description: 'Votre tableau de bord personnel',
};

export default function DashboardPage() {
    return (
        <div className="max-w-3xl w-full flex flex-col gap-8">

            <section className="text-center">
                <h1 className="text-3xl font-bold text-primary mb-2">Tableau de bord</h1>
                <p className="text-muted-foreground text-base">
                    Visualise ton humeur et tes activités du jour en un clin d’oeil.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card rounded-lg shadow-xs p-6 flex flex-col items-center">
                    <Smile className="text-primary mb-2" size={32}/>
                    <span className="font-semibold mb-1">Dernière humeur</span>
                    <span className="text-2xl text-primary-foreground">😊</span>
                </div>

                <div className="bg-card rounded-lg shadow-xs p-6 flex flex-col items-center">
                    <Calendar className="text-primary mb-2" size={32}/>
                    <span className="font-semibold mb-1">Activité principale</span>
                    <span className="text-primary-foreground">Sport</span>
                </div>

                <div className="bg-card rounded-lg shadow-xs p-6 flex flex-col items-center">
                    <BarChart2 className="text-primary mb-2" size={32}/>
                    <span className="font-semibold mb-1">Évolution</span>
                    <span className="text-primary-foreground">Graphique</span>
                    {/* todo: Remplacer par un vrai graphique avec recharts */}
                </div>
            </section>

            <section className="flex flex-col md:flex-row gap-4 justify-center mt-4">
                <Button className="btn-secondary" size="lg">
                    Ajouter une humeur
                </Button>
                <Button className="btn-primary" size="lg">
                    Ajouter une activité
                </Button>
            </section>
        </div>
    );
}
