import {Task} from '../task/task.type'
import {Planning} from "../planning/planning.type"
import {Debrief} from "../debrief/debrief.type";

export type DashboardData = {
    tasks: Task[];
    todayPlanning: Planning | null;
    todayDebrief: Debrief | null;
}