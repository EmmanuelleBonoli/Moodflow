import {TabType} from '@moodflow/types';

interface NavigationProps {
    selectedTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export type NavigationTab = {
    id: TabType,
    label: string,
}

export const TABS: NavigationTab[] = [
    {id: 'overview', label: 'Overview'},
    {id: 'planning', label: 'Planning'},
    {id: 'debrief', label: 'Debrief'},
    {id: 'analytics', label: 'Analytics'}
];

export function Navigation({selectedTab, onTabChange}: NavigationProps) {
    return (
        <nav className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex space-x-2">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onTabChange(tab.id)}
                        className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                            selectedTab === tab.id
                                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                : 'text-gray-600 hover:bg-white hover:shadow-md'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </nav>
    );
}