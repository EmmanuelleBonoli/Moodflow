'use client';

import {useState} from 'react';
import {Navigation} from './components/Navigation';
import {Overview} from './components/Overview/Overview';
import {Planning} from './components/Planning/Planning';
import Analytics from './components/Analytics/Analytics';
import {Debrief} from './components/Debrief/Debrief';
import {TabType} from '@moodflow/types';

export default function Dashboard() {
    const [selectedTab, setSelectedTab] = useState<TabType>('overview');

    const renderContent = () => {
        switch (selectedTab) {
            case 'overview':
                return (
                    <Overview
                        onSwitchToPlanning={() => setSelectedTab('planning')}
                    />
                );
            case 'planning':
                return <Planning/>;
            case 'analytics':
                return <Analytics/>;
            case 'debrief':
                return <Debrief/>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen">
            <Navigation selectedTab={selectedTab} onTabChange={setSelectedTab}/>
            <main className="max-w-7xl mx-auto px-6 pb-8">
                {renderContent()}
            </main>
        </div>
    );
};