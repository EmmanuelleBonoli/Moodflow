"use client"

import {Card} from '@/components/ui/card';
import {TaskItem} from './TaskItem';
import {useDashboardStore} from "@/stores/dashboardStore";
import {TaskDetailModal} from "./TaskDetailModal";
import {useState} from "react";
import {Task} from "@moodflow/types";
import {PaginationControls} from "./PaginationControls";
import {DashboardFacade} from "@/services/facade/dashboard.facade";
import {toast} from "sonner";

interface TaskListProps {
    onSwitchToTasks?: () => void;
}

export function TaskList({onSwitchToTasks}: TaskListProps) {
    const {tasksByPage, dashboardTotal, setCurrentPage, currentPage, pageSize} = useDashboardStore()
    const dashboardService: DashboardFacade = new DashboardFacade()

    const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const totalPages = Math.ceil(dashboardTotal.tasks / pageSize);
    const paginatedTasks = tasksByPage[currentPage] ?? [];

    function onSelectTask(task: Task): void {
        setSelectedTask(task);
        setIsTaskDetailsOpen(true);
    }

    async function handlePageChange(page: number): Promise<void> {
        setCurrentPage(page);
        try {
            await dashboardService.getPaginatedTasks(page, 10)
        } catch (err) {
            toast.error((err as Error).message)
        }
    }

    return (
        <>
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Aperçu des tâches</h3>
                    <div className="flex items-center gap-2">
                            <span
                                className="text-sm text-gray-500">{dashboardTotal.completedTasks}/{dashboardTotal.tasks} terminées</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                                style={{width: `${dashboardTotal.completedTasks / dashboardTotal.tasks * 100}%`}}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-3 mb-4">
                    {onSwitchToTasks ? (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                {tasksByPage[1]?.slice(0, 3).map(task => (
                                    <TaskItem key={task.id} task={task}
                                              selectTask={(task: Task): void => onSelectTask(task)}/>
                                ))}
                            </div>

                            <button
                                onClick={() => onSwitchToTasks()}
                                type="button"
                                className="cursor-pointer w-full text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors">
                                Voir toutes les tâches →
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                {paginatedTasks.map(task => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        selectTask={(task: Task): void => onSelectTask(task)}
                                    />
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <PaginationControls
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </div>
                    )}
                </div>
            </Card>

            {isTaskDetailsOpen ? (
                <TaskDetailModal
                    onOpenChange={() => setIsTaskDetailsOpen(false)}
                    task={selectedTask}/>
            ) : null
            }
        </>
    );
}
