import {create} from 'zustand'
import {Debrief, MoodData, Planning, Task, TaskCompletion, UpdateWeeklyMood} from '@moodflow/types'

interface DashboardState {
    todayMood: number
    tasks: Task[],
    todayPlanning: Planning | null;
    todayDebrief: Debrief | null;
    weeklyMood: MoodData[];
    taskCompletionStats: TaskCompletion[];

    setTodayMood: (mood: number) => void
    setTasks: (tasksData: Task[]) => void
    setPlanning: (planningData: Planning | null) => void
    setDebrief: (debriefData: Debrief | null) => void
    setWeeklyMood: (weeklyMoodData: MoodData[]) => void
    setTaskCompletionStats: (taskCompletionData: TaskCompletion[]) => void
    addTask: (task: Task) => void
    updateTask: (task: Task) => void
    deleteTask: (id: string) => void
    updateWeeklyMoodProductivity: (productivityUpdate: UpdateWeeklyMood) => void
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
    todayMood: 5,
    tasks: [],
    todayPlanning: null,
    todayDebrief: null,
    weeklyMood: [],
    taskCompletionStats: [],

    setTodayMood: (mood: number): void => set({todayMood: mood}),
    setTasks: (tasksData: Task[]): void => set({tasks: tasksData}),
    setPlanning: (planningData: Planning | null): void => set({todayPlanning: planningData}),
    setDebrief: (debriefData: Debrief | null): void => set({todayDebrief: debriefData}),
    setWeeklyMood: (weeklyMoodData: MoodData[]): void => set({weeklyMood: weeklyMoodData}),
    setTaskCompletionStats: (taskCompletionData: TaskCompletion[]): void => set({taskCompletionStats: taskCompletionData}),
    addTask: (task: Task): void => set({tasks: [...get().tasks, task]}),
    updateTask: (task: Task): void => set({tasks: get().tasks.map(t => t.id === task.id ? task : t)}),
    deleteTask: (id: string): void => set({tasks: get().tasks.filter(t => t.id !== id)}),
    updateWeeklyMoodProductivity: (productivityUpdate: UpdateWeeklyMood): void => {
        const existing = get().weeklyMood.find(entry => entry.date.getTime() === productivityUpdate.date.getTime());

        if (existing) {
            existing.taskCompleted.total += productivityUpdate.productivity;

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
}))