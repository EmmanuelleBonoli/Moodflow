"use client";

import {useEffect} from "react";
import {TaskList} from "@/app/dashboard/components/Shared/TaskList";
import {TaskFilters} from "@/app/dashboard/components/Tasks/TaskFilters";

export function Tasks() {
    useEffect(() => {

    }, []);

    return (
        <div className="flex flex-col gap-4">
            <TaskFilters/>
            <TaskList/>
        </div>
    );
}