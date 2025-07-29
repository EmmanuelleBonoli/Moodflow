import TaskCompletionChart from './TaskCompletionChart';
import {Card} from "@/components/ui/card";

const insights = [
    {
        title: '🎯 Meilleure performance',
        description: 'Vendredi matin - 95% de productivité',
        bgGradient: 'bg-gradient-to-r from-green-50 to-emerald-50',
        titleColor: 'text-green-800',
        textColor: 'text-green-600'
    },
    {
        title: '📈 Tendance',
        description: 'Productivité en hausse de 12% cette semaine',
        bgGradient: 'bg-gradient-to-r from-blue-50 to-indigo-50',
        titleColor: 'text-blue-800',
        textColor: 'text-blue-600'
    },
    {
        title: '💡 Recommandation',
        description: 'Planifiez plus de tâches créatives le matin',
        bgGradient: 'bg-gradient-to-r from-purple-50 to-pink-50',
        titleColor: 'text-purple-800',
        textColor: 'text-purple-600'
    }
];

export default function Analytics() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TaskCompletionChart/>

            <Card>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Insights de la semaine</h3>
                <div className="space-y-4">
                    {insights.map((insight, index) => (
                        <div key={index} className={`p-4 ${insight.bgGradient} rounded-xl`}>
                            <p className={`text-sm font-medium ${insight.titleColor}`}>{insight.title}</p>
                            <p className={insight.textColor}>{insight.description}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
