import {Task} from "@moodflow/types";
import {getPriorityStyles} from "@/components/utils";
import {CheckCircle} from "lucide-react";
import React from "react";


export function TaskItem({task, selectTask}: { task: Task, selectTask: (task: Task) => void }) {

    async function quicklyFinishTask(event: React.MouseEvent<HTMLDivElement>): Promise<void> {
        event.stopPropagation();
        console.log("Quickly Finish", task);
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
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityStyles(task.priority)}`}>
                            {task.priority}
                        </span>
                    <span className="text-sm text-gray-500">{task.estimatedDuration}min</span>
                </div>
            </div>

        </div>
    )
}
