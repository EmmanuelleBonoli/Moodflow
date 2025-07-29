import {create} from 'zustand'
import {Debrief, MoodData, Planning, Task, TaskCompletion} from '@moodflow/types'

interface DashboardState {
    // State
    todayMood: number
    tasks: Task[],
    todayPlanning: Planning | null;
    todayDebrief: Debrief | null;
    weeklyMood: MoodData[];
    taskCompletionStats: TaskCompletion[];

    // Computed values
    // completedTasks: number
    // totalTasks: number

    // Actions
    setTodayMood: (mood: number) => void
    setTasks: (tasksData: Task[]) => void
    setPlanning: (planningData: Planning | null) => void
    setDebrief: (debriefData: Debrief | null) => void
    setWeeklyMood: (weeklyMoodData: MoodData[]) => void
    setTaskCompletionStats: (taskCompletionData: TaskCompletion[]) => void
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
    todayMood: 5,
    tasks: [],
    todayPlanning: null,
    todayDebrief: null,
    weeklyMood: [],
    taskCompletionStats: [],

    // Actions
    setTodayMood: (mood: number): void => set({todayMood: mood}),
    setTasks: (tasksData: Task[]): void => set({tasks: tasksData}),
    setPlanning: (planningData: Planning | null): void => set({todayPlanning: planningData}),
    setDebrief: (debriefData: Debrief | null): void => set({todayDebrief: debriefData}),
    setWeeklyMood: (weeklyMoodData: MoodData[]): void => set({weeklyMood: weeklyMoodData}),
    setTaskCompletionStats: (taskCompletionData: TaskCompletion[]): void => set({taskCompletionStats: taskCompletionData})
}))