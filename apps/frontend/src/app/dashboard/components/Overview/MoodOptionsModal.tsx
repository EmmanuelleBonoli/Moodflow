import {X} from 'lucide-react';
import {useDashboardStore} from "@/stores/dashboardStore";
import {toast} from "sonner";
import {DashboardFacade} from "@/services/facade/dashboard.facade";

interface MoodOption {
    value: number;
    emoji: string;
    label: string;
    description: string;
    color: string;
    bgColor: string;
}

interface MoodModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const moodOptions: MoodOption[] = [
    {
        value: 1,
        emoji: '😢',
        label: 'Très mal',
        description: 'Journée difficile',
        color: 'text-red-600',
        bgColor: 'bg-red-50 hover:bg-red-100 border-red-200'
    },
    {
        value: 2,
        emoji: '😔',
        label: 'Mal',
        description: 'Pas en forme',
        color: 'text-red-500',
        bgColor: 'bg-red-50 hover:bg-red-100 border-red-200'
    },
    {
        value: 3,
        emoji: '😕',
        label: 'Moyen-',
        description: 'Quelques soucis',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
    },
    {
        value: 4,
        emoji: '😐',
        label: 'Neutre',
        description: 'Ni bien ni mal',
        color: 'text-gray-600',
        bgColor: 'bg-gray-50 hover:bg-gray-100 border-gray-200'
    },
    {
        value: 5,
        emoji: '🙂',
        label: 'Correct',
        description: 'Ça va',
        color: 'text-gray-600',
        bgColor: 'bg-gray-50 hover:bg-gray-100 border-gray-200'
    },
    {
        value: 6,
        emoji: '😊',
        label: 'Bien',
        description: 'Bonne humeur',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
        value: 7,
        emoji: '😄',
        label: 'Très bien',
        description: 'Journée positive',
        color: 'text-green-600',
        bgColor: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
        value: 8,
        emoji: '😁',
        label: 'Excellent',
        description: 'Super forme !',
        color: 'text-green-600',
        bgColor: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
        value: 9,
        emoji: '🤩',
        label: 'Fantastique',
        description: 'Énergie au top',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200'
    },
    {
        value: 10,
        emoji: '🚀',
        label: 'Au sommet',
        description: 'Rien ne m\'arrête !',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200'
    }
];

export function MoodModal({isOpen, onClose}: MoodModalProps) {
    const {todayMood} = useDashboardStore();
    const dashboardService = new DashboardFacade();

    if (!isOpen) return null;

    async function handleMoodSelect(mood: number): Promise<void> {
        try {
            const today: string = new Date().toISOString().split('T')[0];
            await dashboardService.updateMood({mood, date: today});
            onClose();
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    return (
        <div
            onClick={() => onClose()}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div
                onClick={(event) => {
                    event.stopPropagation()
                }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-white/20">

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Comment vous sentez-vous ?</h2>
                        <p className="text-gray-600">Sélectionnez votre humeur actuelle pour optimiser vos
                            recommandations</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                    >
                        <X className="w-6 h-6 text-gray-500"/>
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {moodOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleMoodSelect(option.value)}
                            className={`p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-105 ${
                                todayMood === option.value
                                    ? 'border-indigo-400 bg-indigo-50 shadow-lg shadow-indigo-500/20'
                                    : `${option.bgColor} border-transparent`
                            }`}
                        >
                            <div className="text-center">
                                <div className="text-3xl mb-2">{option.emoji}</div>
                                <div className="text-lg font-semibold text-gray-800 mb-1">{option.value}/10</div>
                                <div className={`text-sm font-medium ${option.color} mb-1`}>{option.label}</div>
                                <div className="text-xs text-gray-500">{option.description}</div>
                            </div>
                        </button>
                    ))}
                </div>

                <div
                    className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                    <div className="flex items-start gap-3">
                        <div
                            className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm">✨</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-800 mb-1">Pourquoi c&#39;est important ?</p>
                            <p className="text-xs text-gray-600">
                                Votre humeur influence nos recommandations de planning, le type de tâches suggérées et
                                les moments optimaux pour être productif.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
