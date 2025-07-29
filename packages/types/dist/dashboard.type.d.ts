import { Task } from './planning.type';
import { Planning } from "./planning.type";
import { Debrief } from "./debrief.type";
export type DashboardData = {
    tasks: Task[];
    todayPlanning: Planning | null;
    todayDebrief: Debrief | null;
};
