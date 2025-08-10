import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {
    Debrief,
    MoodData,
    NewMood,
    Planning,
    TaskFilter,
    UpdateWeeklyMood
} from '@moodflow/types'

interface DashboardState {
    currentPage: number
    pageSize: number
    taskFilters: TaskFilter
    todayMood: number

    todayPlanning: Planning | null
    todayDebrief: Debrief | null
    weeklyMood: MoodData[]

    setCurrentPage: (page: number) => void
    setTaskFilters: (filters: TaskFilter) => void
    setTodayMood: (mood: number) => void
    setPlanning: (planning: Planning | null) => void
    setDebrief: (debrief: Debrief | null) => void
    setWeeklyMood: (mood: MoodData[]) => void
    updateWeeklyMoodProductivity: (productivityUpdate: UpdateWeeklyMood) => void
    updateWeeklyMoodTodayMood: (newMood: NewMood) => void
}

export const useDashboardStore = create<DashboardState>()(devtools((set, get) => ({
    currentPage: 1,
    pageSize: 10,
    taskFilters: {category: null, status: null},
    todayMood: 5,
    todayPlanning: null,
    todayDebrief: null,
    weeklyMood: [],

    setCurrentPage: (page) => set({currentPage: page}),
    setTaskFilters: (filters) => set({taskFilters: filters}),
    setTodayMood: (mood) => set({todayMood: mood}),
    setPlanning: (planning) => set({todayPlanning: planning}),
    setDebrief: (debrief) => set({todayDebrief: debrief}),
    setWeeklyMood: (mood) => set({weeklyMood: mood}),

    updateWeeklyMoodProductivity: (productivityUpdate) => {
        set((state) => {
            const existing = state.weeklyMood.find(
                entry => entry.date.getTime() === productivityUpdate.date.getTime()
            )

            if (existing) {
                existing.taskCompleted.total += productivityUpdate.productivity
                existing.mood = state.todayMood

                if (productivityUpdate.productivity > 0) {
                    existing.taskCompleted.tasksId.push(productivityUpdate.taskId)
                } else {
                    existing.taskCompleted.tasksId = existing.taskCompleted.tasksId.filter(
                        id => id !== productivityUpdate.taskId
                    )
                }
                return {weeklyMood: [...state.weeklyMood]}
            } else if (productivityUpdate.productivity > 0) {
                return {
                    weeklyMood: [...state.weeklyMood, {
                        date: productivityUpdate.date,
                        mood: state.todayMood,
                        taskCompleted: {
                            total: 1,
                            tasksId: [productivityUpdate.taskId]
                        }
                    }]
                }
            }
            return state
        })
    },

    updateWeeklyMoodTodayMood: (newMood) => {
        set((state) => {
            const existing = state.weeklyMood.find(
                entry => entry.date.getTime() === newMood.date.getTime()
            )

            if (existing) {
                existing.mood = newMood.mood
                return {weeklyMood: [...state.weeklyMood]}
            } else {
                return {
                    weeklyMood: [...state.weeklyMood, {
                        date: newMood.date,
                        mood: newMood.mood,
                        taskCompleted: {total: 0, tasksId: []}
                    }]
                }
            }
        })
    }
})))