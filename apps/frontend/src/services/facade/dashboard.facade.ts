import {useDashboardStore} from "@/stores/dashboardStore";
import {DashboardData, NewMood, Task, UpdateWeeklyMood} from "@moodflow/types";
import {moodApi, taskApi} from "@/services/api";
import {normalizeDates} from "@/utils/utils";

export class DashboardFacade {
    private dashboardStore = useDashboardStore();

    updateDashboardStore(dashboardData: DashboardData): void {
        const normalizedDashboard: DashboardData = normalizeDates(dashboardData);

        this.dashboardStore.setTasksForPage(1, normalizedDashboard.tasks)
        this.dashboardStore.setDashboardTotal(normalizedDashboard.total)
        this.dashboardStore.setPlanning(normalizedDashboard.todayPlanning)
        this.dashboardStore.setDebrief(normalizedDashboard.todayDebrief)
        this.dashboardStore.setTodayMood(normalizedDashboard.todayMood?.value ?? 5)
        this.dashboardStore.setWeeklyMood(normalizedDashboard.weeklyMood)
    }

    async createTask(task: Partial<Task>): Promise<void> {
        try {
            const taskCreated: Task = await taskApi.create(task);
            this.dashboardStore.addTask(taskCreated);
            this.dashboardStore.setDashboardTotal({
                tasks: this.dashboardStore.dashboardTotal.tasks + 1,
                completedTasks: this.dashboardStore.dashboardTotal.completedTasks
            })
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
                this.dashboardStore.setDashboardTotal({
                    tasks: this.dashboardStore.dashboardTotal.tasks,
                    completedTasks: this.dashboardStore.dashboardTotal.completedTasks + productivityUpdate.productivity
                })
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteTask(task: Task): Promise<void> {
        try {
            await taskApi.delete(task.id);
            this.dashboardStore.deleteTask(task.id);
            this.dashboardStore.setDashboardTotal({
                tasks: this.dashboardStore.dashboardTotal.tasks - 1,
                completedTasks: task.status === "completed" ? this.dashboardStore.dashboardTotal.completedTasks - 1 : this.dashboardStore.dashboardTotal.completedTasks
            })
        } catch (error) {
            throw error;
        }
    }

    async updateMood(newMood: NewMood): Promise<void> {
        try {
            await moodApi.update(newMood);
            this.dashboardStore.setTodayMood(newMood.mood);
            this.dashboardStore.updateWeeklyMoodTodayMood(newMood);
        } catch (error) {
            throw error;
        }
    }

    async getPaginatedTasks(page: number, pageSize: number): Promise<void> {
        try {
            const existing = this.dashboardStore.tasksByPage[page];
            if (!existing) {
                const tasksData: Task[] = await taskApi.list(page, pageSize)
                this.dashboardStore.setTasksForPage(page, tasksData);
            }
        } catch (error) {
            throw error;
        }
    }
}