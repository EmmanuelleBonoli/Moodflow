"use client"

import {Card} from '@/components/ui/card';
import {TaskItem} from './TaskItem';
import {useDashboardStore} from "@/stores/dashboardStore";
import {TaskDetailModal} from "../Tasks/TaskDetailModal";
import {useState} from "react";
import {Task, TaskStatusSchema} from "@moodflow/types";
import {PaginationControls} from "../Tasks/PaginationControls";
import {useTasks} from "@/hooks/useTasks";

interface TaskListProps {
    onSwitchToTasks?: () => void;
}

export function TaskList({onSwitchToTasks}: TaskListProps) {
    const {currentPage, pageSize, taskFilters, setCurrentPage} = useDashboardStore();

    const {data, isLoading, error} = useTasks(currentPage, pageSize, taskFilters);

    const tasks = data?.tasks ?? [];
    const totalTasks = data?.totals.filteredTasks ?? 0;
    const completedTasks = data?.totals.filteredCompletedTasks ?? 0;

    const totalPages = Math.ceil(totalTasks / pageSize);

    const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    function onSelectTask(task: Task): void {
        setSelectedTask(task);
        setIsTaskDetailsOpen(true);
    }


    function handlePageChange(newPage: number) {
        setCurrentPage(newPage);
    }


    if (isLoading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {(error as Error).message}</div>;


    return (
        <>
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Aperçu des tâches</h3>
                    <div className="flex items-center gap-2">
                            <span
                                className="text-sm text-gray-500">{completedTasks}/{totalTasks} terminées</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                                style={{width: `${completedTasks / totalTasks * 100}%`}}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-3 mb-4">
                    {onSwitchToTasks ? (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                {tasks.filter((task) => task.status !== TaskStatusSchema.enum.completed).slice(0, 3).map(task => (
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
                                {tasks.map(task => (
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
