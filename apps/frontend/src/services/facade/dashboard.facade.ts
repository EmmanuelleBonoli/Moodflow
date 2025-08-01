import {useDashboardStore} from "@/stores/dashboardStore";
import {DashboardData, NewMood, Task, UpdateWeeklyMood} from "@moodflow/types";
import {moodApi, taskApi} from "@/services/api";

export class DashboardFacade {
    private dashboardStore = useDashboardStore();

    updateDashboardStore(dashboardData: DashboardData) {

        this.dashboardStore.setTasks(dashboardData.tasks)
        this.dashboardStore.setPlanning(dashboardData.todayPlanning)
        this.dashboardStore.setDebrief(dashboardData.todayDebrief)
        this.dashboardStore.setTodayMood(dashboardData.todayMood?.value ?? 5)

        const normalizedWeeklyMood = dashboardData.weeklyMood.map(entry => ({
            ...entry,
            date: new Date(entry.date),
        }));

        this.dashboardStore.setWeeklyMood(normalizedWeeklyMood)
    }

    async createTask(task: Partial<Task>): Promise<void> {
        try {
            const taskCreated: Task = await taskApi.create(task);
            this.dashboardStore.addTask(taskCreated);
        } catch (error) {
            throw error;
        }
    }

    async updateTask(task: Task, productivityUpdate?: UpdateWeeklyMood): Promise<void> {
        try {
            await taskApi.update(task);
            this.dashboardStore.updateTask(task);

            if (productivityUpdate) {
                this.dashboardStore.updateWeeklyMoodProductivity(productivityUpdate);
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteTask(taskId: string): Promise<void> {
        try {
            await taskApi.delete(taskId);
            this.dashboardStore.deleteTask(taskId);
        } catch (error) {
            throw error;
        }
    }

    async updateMood(newMood: NewMood): Promise<void> {
        try {
            await moodApi.update(newMood);
            this.dashboardStore.setTodayMood(newMood.mood);
        } catch (error) {
            throw error;
        }
    }
}