import {Card} from '@/components/ui/card';
import {PlanningAssistant} from "@/app/dashboard/components/Overview/PlanningAssistant";

interface PlanningItem {
    title: string;
    description: string;
    borderColor: string;
    bgColor: string;
}

interface PlanningSection {
    period: string;
    emoji: string;
    items: PlanningItem[];
}

const planningData: PlanningSection[] = [
    {
        period: 'Matin (9h-12h)',
        emoji: '🌅',
        items: [
            {
                title: 'Développer API users',
                description: 'Peak créativité détectée',
                borderColor: 'border-green-400',
                bgColor: 'bg-green-50'
            },
            {
                title: 'Révision React',
                description: 'Apprentissage optimal',
                borderColor: 'border-blue-400',
                bgColor: 'bg-blue-50'
            }
        ]
    },
    {
        period: 'Après-midi (14h-17h)',
        emoji: '☀️',
        items: [
            {
                title: 'Réunion équipe',
                description: 'Collaboration recommandée',
                borderColor: 'border-yellow-400',
                bgColor: 'bg-yellow-50'
            },
            {
                title: 'Documentation',
                description: 'Tâche administrative',
                borderColor: 'border-orange-400',
                bgColor: 'bg-orange-50'
            }
        ]
    },
    {
        period: 'Fin de journée',
        emoji: '🌙',
        items: [
            {
                title: 'Débrief & planification',
                description: 'Réflexion recommandée',
                borderColor: 'border-purple-400',
                bgColor: 'bg-purple-50'
            }
        ]
    }
];

export const Planning = () => (
    <>
        <PlanningAssistant/>
        <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Planning suggéré de la journée
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {planningData.map((section, index) => (
                    <div key={index} className="space-y-3">
                        <h4 className="font-medium text-gray-700">
                            {section.emoji} {section.period}
                        </h4>
                        {section.items.map((item, itemIndex) => (
                            <div key={itemIndex}
                                 className={`p-3 ${item.bgColor} rounded-lg border-l-4 ${item.borderColor}`}>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </Card>
    </>
);