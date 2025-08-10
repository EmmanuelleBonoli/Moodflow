import {useDashboardStore} from "@/stores/dashboardStore";
import {
    DashboardData,
    NewMood,
    Task,
    UpdateWeeklyMood
} from "@moodflow/types";
import {moodApi} from "@/services/api";
import {normalizeDates, makeQueryParamsKey} from "@/utils/utils";
import {useCreateTask, useDeleteTask, useUpdateTask} from "@/hooks/useTasks";

export class DashboardFacade {
    private dashboardStore = useDashboardStore.getState()

    private createTaskMutation = useCreateTask()
    private updateTaskMutation = useUpdateTask()
    private deleteTaskMutation = useDeleteTask()


    updateDashboardStore(dashboardData: DashboardData): void {
        const normalized = normalizeDates(dashboardData)
        this.dashboardStore.setPlanning(normalized.todayPlanning)
        this.dashboardStore.setDebrief(normalized.todayDebrief)
        this.dashboardStore.setTodayMood(normalized.todayMood?.value ?? 5)
        this.dashboardStore.setWeeklyMood(normalized.weeklyMood)
    }

    async createTask(task: Partial<Task>): Promise<void> {
        try {
            const {currentPage, pageSize, taskFilters} = this.dashboardStore;
            const queryParamsKey: string = makeQueryParamsKey(currentPage, pageSize, taskFilters);

            await this.createTaskMutation.mutateAsync({task, queryParamsKey})
        } catch (error) {
            throw error;
        }
    }

    async updateTask(task: Task, productivityUpdate?: UpdateWeeklyMood): Promise<void> {
        try {
            const {currentPage, pageSize, taskFilters} = this.dashboardStore;
            const queryParamsKey: string = makeQueryParamsKey(currentPage, pageSize, taskFilters);

            await this.updateTaskMutation.mutateAsync({task, queryParamsKey})

            if (productivityUpdate) {
                this.dashboardStore.updateWeeklyMoodProductivity(productivityUpdate);
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteTask(task: Task): Promise<void> {
        try {
            const {currentPage, pageSize, taskFilters} = this.dashboardStore;
            const queryParamsKey: string = makeQueryParamsKey(currentPage, pageSize, taskFilters);

            await this.deleteTaskMutation.mutateAsync({taskId: task.id, queryParamsKey})
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
}