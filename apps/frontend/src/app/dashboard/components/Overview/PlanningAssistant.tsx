"use client"

import {useState} from "react";
import {Plus, Sparkles} from "lucide-react";
import {useDashboardStore} from "@/stores/dashboardStore";
import {CreateTaskModal} from "../Task/CreateTaskModal";

interface OverviewProps {
    onSwitchToPlanning?: () => void;
}

export function PlanningAssistant({onSwitchToPlanning}: OverviewProps) {
    const {todayMood, dashboardTotal} = useDashboardStore()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    function getMoodMessage(todayMood: number, totalTasks: number): string {
        switch (todayMood) {
            case 1:
                return `Journée difficile (${todayMood}/10). Allégeons votre charge : l'IA peut vous aider à prioriser vos ${totalTasks} tâches.`;
            case 2:
                return `Vous semblez fatigué (${todayMood}/10). Pourquoi ne pas déléguer un peu ? L'IA peut vous assister avec vos ${totalTasks} tâches.`;
            case 3:
                return `Quelques soucis aujourd'hui (${todayMood}/10) ? L'IA peut vous aider à gérer plus sereinement vos ${totalTasks} tâches.`;
            case 4:
                return `Humeur neutre (${todayMood}/10). L'IA peut structurer vos ${totalTasks} tâches pour une journée équilibrée.`;
            case 5:
                return `Ça va plutôt bien (${todayMood}/10). C’est le bon moment pour organiser calmement vos ${totalTasks} tâches.`;
            case 6:
                return `Bonne humeur aujourd’hui (${todayMood}/10) ! L'IA peut vous aider à tirer le meilleur de vos ${totalTasks} tâches.`;
            case 7:
                return `Journée positive (${todayMood}/10) ! Et si on optimisait vos ${totalTasks} tâches avec l'IA ?`;
            case 8:
                return `Super forme aujourd’hui (${todayMood}/10) ! On peut tirer parti de cette énergie pour planifier intelligemment vos ${totalTasks} tâches.`;
            case 9:
                return `Énergie au top (${todayMood}/10) ! C’est le moment idéal pour booster votre productivité avec l’IA. Vous avez ${totalTasks} tâches à organiser.`;
            case 10:
                return `Rien ne vous arrête aujourd’hui (${todayMood}/10) ! Envolez-vous vers l’efficacité : l’IA peut optimiser vos ${totalTasks} tâches.`;
            default:
                return `Votre humeur est inconnue (${todayMood}/10). L'IA peut tout de même vous aider à gérer vos ${totalTasks} tâches.`;
        }
    }

    return (
        <div
            className="bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-3xl p-8 border border-indigo-200/50 shadow-2xl shadow-indigo-500/10">
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                    <div
                        className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Sparkles className="w-8 h-8 text-white"/>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                            Assistant Planning
                            <span
                                className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">En ligne</span>
                        </h3>
                        <p className="text-gray-600 mb-4 max-w-2xl">
                            {getMoodMessage(todayMood, dashboardTotal.tasks)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    type="button"
                    className="cursor-pointer flex-1 bg-white/80 backdrop-blur-sm text-indigo-600 px-6 py-4 rounded-xl font-medium border border-indigo-200 hover:bg-white hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5"/>
                    Ajouter une tâche
                </button>
                <button
                    type="button"
                    onClick={onSwitchToPlanning}
                    className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                    <Sparkles className="w-5 h-5"/>
                    Générer le planning
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Recommandé</span>
                </button>
            </div>

            <CreateTaskModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    )
}