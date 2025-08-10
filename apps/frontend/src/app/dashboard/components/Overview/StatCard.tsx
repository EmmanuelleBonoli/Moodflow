import {Card} from "@/components/ui/card";
import {CheckCircle, Edit3, TrendingUp} from "lucide-react";
import {useDashboardStore} from "@/stores/dashboardStore";
import {useTasks} from "@/hooks/useTasks";

interface StatCardProps {
    openMoodModal: () => void;
}

export function StatCard({openMoodModal}: StatCardProps) {
    const {todayMood, currentPage, pageSize, taskFilters} = useDashboardStore();

    const {data} = useTasks(currentPage, pageSize, taskFilters);
    const totalTasks = data?.totals.totalTasks ?? 0;
    const totalCompletedTasks = data?.totals.totalCompletedTasks ?? 0;

    const getMoodEmoji = (mood: number) => {
        const emojiMap: { [key: number]: string } = {
            1: '😢', 2: '😔', 3: '😕', 4: '😐', 5: '🙂',
            6: '😊', 7: '😄', 8: '😁', 9: '🤩', 10: '🚀'
        };
        return emojiMap[mood] || '😊';
    };

    const statCards = [
        {
            title: 'Humeur du jour',
            value: `${todayMood}/10`,
            icon: (
                <div className="flex items-center justify-center w-full h-full relative group">
                    <span className="text-2xl">{getMoodEmoji(todayMood)}</span>
                    <button
                        onClick={() => openMoodModal()}
                        className="cursor-pointer absolute inset-0 bg-black/0 hover:bg-black/10 rounded-xl transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                    >
                        <Edit3 className="w-4 h-4 text-white"/>
                    </button>
                </div>
            ),
            gradient: 'bg-gradient-to-r from-green-400 to-emerald-500',
            shadowColor: 'shadow-indigo-500/5'
        },
        {
            title: 'Tâches complétées',
            value: `${totalCompletedTasks}/${totalTasks}`,
            icon: <CheckCircle className="w-6 h-6 text-white"/>,
            gradient: 'bg-gradient-to-r from-purple-400 to-indigo-500',
            shadowColor: 'shadow-purple-500/5'
        },
        {
            title: 'Productivité',
            value: `${Math.round((totalCompletedTasks / totalTasks) * 100)}%`,
            icon: <TrendingUp className="w-6 h-6 text-white"/>,
            gradient: 'bg-gradient-to-r from-teal-400 to-cyan-500',
            shadowColor: 'shadow-teal-500/5'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statCards.map((card, index) => (
                <Card key={index} className={`shadow-xl ${card.shadowColor}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                            <p className="text-3xl font-bold text-indigo-600">{card.value}</p>
                        </div>
                        <div className={`w-12 h-12 ${card.gradient} rounded-xl flex items-center justify-center`}>
                            {card.icon}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}
