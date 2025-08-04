"use client";

import {useEffect} from "react";
import {TaskList} from "@/app/dashboard/components/Task/TaskList";

export function Tasks() {
    useEffect(() => {

    }, []);

    return (
        <div className="flex flex-col gap-4">
            <TaskList/>
        </div>
    );
}