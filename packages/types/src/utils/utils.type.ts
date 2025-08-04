export type StartAndEndOfDay = {
    startOfDay: Date,
    endOfDay: Date,
};

export interface StatCard {
    title: string;
    value: string;
    icon: React.ReactNode;
    gradient: string;
    shadowColor: string;
}

export type TabType = 'overview' | 'tasks' | 'planning' | 'analytics' | 'debrief';