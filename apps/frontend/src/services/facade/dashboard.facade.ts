import {useDashboardStore} from "@/stores/dashboardStore";
import {DashboardData, Task} from "@moodflow/types";
import {taskApi} from "@/services/api";

export class DashboardFacade {
    private dashboardStore = useDashboardStore();

    updateDashboardStore(dashboardData: DashboardData) {
        this.dashboardStore.setTasks(dashboardData.tasks)
        this.dashboardStore.setPlanning(dashboardData.todayPlanning)
        this.dashboardStore.setDebrief(dashboardData.todayDebrief)
        this.dashboardStore.setTodayMood(dashboardData.todayPlanning?.mood ?? 5)
    }

    async createTask(task: Partial<Task>): Promise<void> {
        try {
            const taskCreated: Task = await taskApi.create(task);
            console.log(taskCreated);
        } catch (error) {
            throw error;
        }
    }
}