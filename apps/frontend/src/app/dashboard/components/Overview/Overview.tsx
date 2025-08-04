import {StatCard} from './StatCard';
import {TaskList} from '../Task/TaskList';
import {MoodChart} from './MoodChart';
import {useState} from "react";
import {MoodModal} from "./MoodOptionsModal";
import {PlanningAssistant} from "./PlanningAssistant";

interface OverviewProps {
    onSwitchToPlanning: () => void;
    onSwitchToTasks: () => void;
}

export function Overview({onSwitchToPlanning, onSwitchToTasks}: OverviewProps) {
    const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <StatCard openMoodModal={() => setIsMoodModalOpen(true)}/>
            <PlanningAssistant onSwitchToPlanning={() => onSwitchToPlanning()}/>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TaskList onSwitchToTasks={() => onSwitchToTasks()}/>
                <MoodChart/>
            </div>

            <MoodModal
                isOpen={isMoodModalOpen}
                onClose={() => setIsMoodModalOpen(false)}
            />
        </div>
    );
}
