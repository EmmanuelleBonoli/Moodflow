import {Card} from '@/components/ui/card';
import {useState} from "react";
import {CheckCircle, Clock, Sparkles} from "lucide-react";

const mockAIDebrief = {
    summary: "Excellente journée productive ! Vous avez su maintenir un bon rythme de travail avec 8 tâches accomplies sur 10. Votre concentration matinale était remarquable, mais attention à la baisse d'énergie après 16h - pensez à faire des pauses plus régulières.",
    successes: [
        '• API users développée avec succès',
        '• Réunion très productive',
        '• Bonne gestion du temps'
    ],
    improvements: [
        '• Documentation pas terminée',
        '• Pause déjeuner trop courte',
        '• Concentration baisse après 16h'
    ]
};

export function Debrief() {
    const [userInput, setUserInput] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitDebrief = async () => {
        if (!userInput.trim()) return;

        setIsLoading(true);
        // Simuler l'appel API
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 2000);
    };

    if (!isSubmitted) {
        return (
            <Card className="p-6">
                <div className="text-center mb-6">
                    <div
                        className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-8 h-8 text-white"/>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Prêt à clôturer votre journée ?
                    </h3>
                    <p className="text-gray-600">
                        Partagez vos réflexions et recevez un débrief personnalisé généré par IA
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <h4 className="font-medium text-gray-700 mb-3">
                            Comment s&#39;est passée votre journée ?
                        </h4>
                        <textarea
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                            rows={4}
                            placeholder="Partagez vos réflexions, vos défis, vos victoires... Tout ce qui vous passe par la tête !"
                        />
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
                        <div className="flex items-start space-x-3">
                            <Sparkles className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0"/>
                            <div className="text-sm">
                                <p className="text-gray-700 mb-2">
                                    <strong>Votre débrief IA incluera :</strong>
                                </p>
                                <ul className="text-gray-600 space-y-1">
                                    <li>• Une analyse de votre productivité du jour</li>
                                    <li>• Vos points forts et réussites</li>
                                    <li>• Des suggestions d&#39;amélioration personnalisées</li>
                                    <li>• Des insights basés sur vos tâches accomplies</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmitDebrief}
                        disabled={!userInput.trim() || isLoading}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-3 px-6 rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div
                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Génération du débrief...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center space-x-2">
                                <Sparkles className="w-5 h-5"/>
                                <span>Générer mon débrief quotidien</span>
                            </div>
                        )}
                    </button>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-6">
            <div className="text-center mb-6">
                <div
                    className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white"/>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Débrief de votre journée
                </h3>
                <p className="text-gray-600">
                    Analyse générée par IA basée sur vos activités et réflexions
                </p>
            </div>

            <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-medium text-gray-700 mb-2">Vos réflexions</h4>
                    <p className="text-gray-600 italic">&#34;{userInput}&#34;</p>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
                    <div className="flex items-start space-x-3 mb-3">
                        <Sparkles className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0"/>
                        <h4 className="font-medium text-gray-800">Analyse IA</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                        {mockAIDebrief.summary}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-xl">
                        <h5 className="font-medium text-green-800 mb-3 flex items-center">
                            <span className="mr-2">✅</span>
                            Réussites détectées
                        </h5>
                        <ul className="text-sm text-green-600 space-y-2">
                            {mockAIDebrief.successes.map((item, index) => (
                                <li key={index} className="leading-relaxed">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-xl">
                        <h5 className="font-medium text-orange-800 mb-3 flex items-center">
                            <span className="mr-2">🔄</span>
                            Pistes d&#39;amélioration
                        </h5>
                        <ul className="text-sm text-orange-600 space-y-2">
                            {mockAIDebrief.improvements.map((item, index) => (
                                <li key={index} className="leading-relaxed">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex space-x-3 pt-4">
                    <button
                        onClick={() => {
                            setIsSubmitted(false);
                            setUserInput('');
                        }}
                        className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Nouveau débrief
                    </button>
                    <button
                        className="flex-1 bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors">
                        Sauvegarder
                    </button>
                </div>
            </div>
        </Card>
    );
}
