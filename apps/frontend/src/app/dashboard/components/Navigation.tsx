import {TabType} from '@moodflow/types';
import {PanelLeft, CalendarCheck2, MessagesSquare, TrendingUp, ListTodo} from 'lucide-react';
import React from "react";

interface NavigationProps {
    selectedTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export type NavigationTab = {
    id: TabType,
    label: string,
    icon: React.ReactNode,
}

export const TABS: NavigationTab[] = [
    {id: 'overview', label: 'Overview', icon: <PanelLeft className="w-5 h-5 mr-2"/>},
    {id: 'tasks', label: 'Tasks', icon: <ListTodo className="w-5 h-5 mr-2"/>},
    {id: 'planning', label: 'Planning', icon: <CalendarCheck2 className="w-5 h-5 mr-2"/>},
    {id: 'debrief', label: 'Debrief', icon: <MessagesSquare className="w-5 h-5 mr-2"/>},
    {id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-5 h-5 mr-2"/>}
];

export function Navigation({selectedTab, onTabChange}: NavigationProps) {
    return (
        <nav className="
        w-full
        border-t
        fixed bottom-0 left-0 z-50
        md:static md:border-none md:py-4 md:px-6 md:max-w-7xl md:mx-auto">
            <div className="flex justify-around md:justify-start md:space-x-4">
                {TABS.map((tab) => {
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onTabChange(tab.id)}
                            className={`flex cursor-pointer px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                selectedTab === tab.id
                                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                    : 'text-gray-600 hover:bg-white hover:shadow-md'
                            }`}
                        >
                            <div className="flex items-center">
                                <span className="space-x-2">{tab.icon}</span>
                                <span className="hidden md:inline">{tab.label}</span>
                            </div>
                        </button>
                    )
                })}
            </div>
        </nav>
    );
}