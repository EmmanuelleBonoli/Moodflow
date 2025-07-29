import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import {Card} from "@/components/ui/card";
import {useDashboardStore} from "@/stores/dashboardStore";


export function MoodChart() {
    const {weeklyMood} = useDashboardStore()
    return (
        <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Humeur & Productivité</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyMood}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff"/>
                    <XAxis dataKey="date" stroke="#6b7280"/>
                    <YAxis stroke="#6b7280"/>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{fill: '#8b5cf6', strokeWidth: 2, r: 6}}
                        name="Humeur"
                    />
                    <Line
                        type="monotone"
                        dataKey="productivity"
                        stroke="#06b6d4"
                        strokeWidth={3}
                        dot={{fill: '#06b6d4', strokeWidth: 2, r: 6}}
                        name="Productivité"
                    />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    )
}