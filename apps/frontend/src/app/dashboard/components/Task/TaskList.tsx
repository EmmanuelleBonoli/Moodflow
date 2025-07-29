"use client"

import {Card} from '@/components/ui/card';
import {TaskItem} from './TaskItem';
import {useDashboardStore} from "@/stores/dashboardStore";
import {TaskDetailModal} from "./TaskDetailModal";
import {useState} from "react";
import {Task} from "@moodflow/types";

export function TaskList() {
    const {tasks} = useDashboardStore()
    const totalTasks = useDashboardStore(state => state.tasks.length);
    const completedTasks = useDashboardStore(state => state.tasks.filter(t => t.status === 'completed').length);

    const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    function onSelectTask(task: Task): void {
        setSelectedTask(task);
        setIsTaskDetailsOpen(true);
    }

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
                    <div className="space-y-6">
                        <div className="space-y-3">
                            {tasks.slice(0, 3).map(task => (
                                <TaskItem key={task.id} task={task}
                                          selectTask={(task: Task): void => onSelectTask(task)}/>
                            ))}
                        </div>
                        <button
                            className="w-full text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors">
                            Voir toutes les tâches →
                        </button>
                    </div>
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
