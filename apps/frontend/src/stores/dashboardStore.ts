import {create} from 'zustand'
import {
    DashboardTotal,
    Debrief,
    MoodData,
    NewMood,
    Planning,
    Task,
    TaskCompletion,
    UpdateWeeklyMood
} from '@moodflow/types'

interface DashboardState {
    todayMood: number
    pageSize: number,
    currentPage: number,
    tasksByPage: Record<number, Task[]>,
    todayPlanning: Planning | null;
    todayDebrief: Debrief | null;
    weeklyMood: MoodData[];
    taskCompletionStats: TaskCompletion[];
    dashboardTotal: DashboardTotal;

    setTodayMood: (mood: number) => void
    setDashboardTotal: (total: DashboardTotal) => void
    setPlanning: (planningData: Planning | null) => void
    setDebrief: (debriefData: Debrief | null) => void
    setWeeklyMood: (weeklyMoodData: MoodData[]) => void
    setCurrentPage: (page: number) => void;
    setTaskCompletionStats: (taskCompletionData: TaskCompletion[]) => void
    getTasksForPage: (page: number) => Task[] | undefined;
    addTask: (tasks: Task) => void
    setTasksForPage: (page: number, tasks: Task[]) => void
    updateTask: (task: Task) => void
    deleteTask: (id: string) => void
    updateWeeklyMoodProductivity: (productivityUpdate: UpdateWeeklyMood) => void
    updateWeeklyMoodTodayMood: (newMood: NewMood) => void
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
    todayMood: 5,
    tasksByPage: {} as Record<number, Task[]>,
    pageSize: 10,
    currentPage: 1,
    todayPlanning: null,
    todayDebrief: null,
    weeklyMood: [],
    taskCompletionStats: [],
    dashboardTotal: {
        tasks: 0,
        completedTasks: 0
    },

    setCurrentPage: (page) => set({currentPage: page}),
    setTodayMood: (mood: number): void => set({todayMood: mood}),
    setTasksForPage: (page: number, tasks: Task[]) =>
        set((state) => ({
            tasksByPage: {
                ...state.tasksByPage,
                [page]: tasks,
            },
        })),
    getTasksForPage: (page) => get().tasksByPage[page],
    addTask: (task: Task): void =>
        set((state) => {
            const existingTasks = state.tasksByPage[1] || [];
            return {
                tasksByPage: {
                    ...state.tasksByPage,
                    1: [task, ...existingTasks],
                },
            };
        }),
    setDashboardTotal: (total: DashboardTotal): void => set({dashboardTotal: total}),
    setPlanning: (planningData: Planning | null): void => set({todayPlanning: planningData}),
    setDebrief: (debriefData: Debrief | null): void => set({todayDebrief: debriefData}),
    setWeeklyMood: (weeklyMoodData: MoodData[]): void => set({weeklyMood: weeklyMoodData}),
    setTaskCompletionStats: (taskCompletionData: TaskCompletion[]): void => set({taskCompletionStats: taskCompletionData}),
    updateTask: (updatedTask: Task): void =>
        set((state) => {
            const updatedPages = Object.fromEntries(
                Object.entries(state.tasksByPage).map(([page, tasks]) => [
                    page,
                    tasks.map(t => t.id === updatedTask.id ? updatedTask : t),
                ])
            );

            return {tasksByPage: updatedPages};
        }),
    deleteTask: (taskId: string): void =>
        set((state) => {
            const updatedPages = Object.fromEntries(
                Object.entries(state.tasksByPage).map(([page, tasks]) => [
                    page,
                    tasks.filter(t => t.id !== taskId),
                ])
            );

            return {tasksByPage: updatedPages};
        }),
    updateWeeklyMoodProductivity: (productivityUpdate: UpdateWeeklyMood): void => {
        const existing = get().weeklyMood.find(entry => entry.date.getTime() === productivityUpdate.date.getTime());

        if (existing) {
            existing.taskCompleted.total += productivityUpdate.productivity;
            existing.mood = get().todayMood;

            if (productivityUpdate.productivity > 0) {
                existing.taskCompleted.tasksId.push(productivityUpdate.taskId);
            } else {
                existing.taskCompleted.tasksId = existing.taskCompleted.tasksId.filter(id => id !== productivityUpdate.taskId);
            }
        } else if (productivityUpdate.productivity > 0) {
            get().weeklyMood.push({
                date: productivityUpdate.date,
                mood: get().todayMood,
                taskCompleted: {
                    total: 1,
                    tasksId: [productivityUpdate.taskId]
                }
            });
        }
    },
    updateWeeklyMoodTodayMood(newMood: NewMood): void {
        const existing = get().weeklyMood.find(entry => entry.date.getTime() === newMood.date.getTime());

        if (existing) {
            existing.mood = newMood.mood;
        } else {
            get().weeklyMood.push({
                date: newMood.date,
                mood: newMood.mood,
                taskCompleted: {
                    total: 0,
                    tasksId: []
                }
            });
        }
    }
}))