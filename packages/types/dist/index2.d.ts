export interface MoodData {
    date: string;
    mood: number;
    productivity: number;
}
export interface TaskCompletion {
    name: string;
    completed: number;
    total: number;
}
export interface StatCard {
    title: string;
    value: string;
    icon: React.ReactNode;
    gradient: string;
    shadowColor: string;
}
export type TabType = 'overview' | 'planning' | 'analytics' | 'debrief';
