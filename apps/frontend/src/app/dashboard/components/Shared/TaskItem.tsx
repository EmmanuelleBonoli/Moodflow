import {Task, UpdateWeeklyMood, TaskStatusSchema} from "@moodflow/types";
import {CheckCircle} from "lucide-react";
import React from "react";
import {getCategoryStyles, getToday, getPriorityStyles} from "@/utils/utils";
import {toast} from "sonner";
import {DashboardFacade} from "@/services/facade/dashboard.facade";

export function TaskItem({task, selectTask}: { task: Task, selectTask: (task: Task) => void }) {
    const dashboardService: DashboardFacade = new DashboardFacade();

    async function quicklyFinishTask(event: React.MouseEvent<HTMLDivElement>): Promise<void> {
        event.stopPropagation();
        const isNewCompletedTask: boolean = task.status !== TaskStatusSchema.enum.completed;
        const isNoLongerCompleted: boolean = task.status === TaskStatusSchema.enum.completed;

        const updatedTask = {
            ...task,
            updatedAt: new Date(),
            status: isNewCompletedTask ? TaskStatusSchema.enum.completed : TaskStatusSchema.enum.pending,
            completedAt: isNewCompletedTask
                ? getToday()
                : isNoLongerCompleted
                    ? null
                    : task.completedAt,
        }

        let productivityUpdate: UpdateWeeklyMood | undefined;
        if (isNewCompletedTask) {
            productivityUpdate = {
                productivity: +1,
                date: updatedTask.completedAt!,
                taskId: task.id,
            };
        } else if (isNoLongerCompleted) {
            productivityUpdate = {
                productivity: -1,
                date: task.completedAt!,
                taskId: task.id,
            };
        }

        try {
            await dashboardService.updateTask(updatedTask, productivityUpdate);
            toast.success("Tâche mise à jour.");
        } catch (error) {
            toast((error as Error).message)
        }
    }

    return (
        <div onClick={() => selectTask(task)}
             className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
                 task.status === 'completed'
                     ? 'bg-green-50 border-green-200 opacity-75'
                     : 'bg-white border-gray-200 hover:shadow-md'
             }`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div onClick={(event: React.MouseEvent<HTMLDivElement>) => quicklyFinishTask(event)}
                         className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                             task.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-gray-300'
                         }`}>
                        {task.status === 'completed' && <CheckCircle className="w-3 h-3 text-white"/>}
                    </div>
                    <span className={task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}>
                         {task.title}
                     </span>
                </div>
                <div className="flex items-center space-x-2">
                    <span
                        className={`px-2 py-1 rounded-full text-xs ${getCategoryStyles(task.category)}`}>
                            {task.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityStyles(task.priority)}`}>
                            {task.priority}
                        </span>
                    <span className="text-sm text-gray-500">{task.estimatedDuration}min</span>
                </div>
            </div>

        </div>
    )
}
