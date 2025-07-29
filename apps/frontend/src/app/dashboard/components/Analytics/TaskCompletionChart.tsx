import {useDashboardStore} from "@/stores/dashboardStore";
import {Card} from "@/components/ui/card";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';

export default function TaskCompletionChart() {
    const {taskCompletionStats} = useDashboardStore()
    return (
        <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Répartition des tâches</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={taskCompletionStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff"/>
                    <XAxis dataKey="name" stroke="#6b7280"/>
                    <YAxis stroke="#6b7280"/>
                    <Tooltip/>
                    <Bar dataKey="completed" fill="#8b5cf6" name="Complétées"/>
                    <Bar dataKey="total" fill="#e0e7ff" name="Total"/>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
};