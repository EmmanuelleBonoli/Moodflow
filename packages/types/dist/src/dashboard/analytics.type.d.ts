export interface ProductivityMetrics {
    date: string;
    mood: number;
    productivity: number;
    completedTasks: number;
    totalTasks: number;
}
export interface WeeklyInsights {
    bestPerformanceDay: string;
    averageMood: number;
    productivityTrend: number;
    recommendations: string[];
}
