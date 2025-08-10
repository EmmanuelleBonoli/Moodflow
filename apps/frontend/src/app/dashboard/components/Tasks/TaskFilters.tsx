"use client"

import {SlidersHorizontal} from "lucide-react";
import {useDashboardStore} from "@/stores/dashboardStore";
import {TaskCategorySchema, TaskStatusSchema} from "@moodflow/types";

const statusOptions = [
    {value: TaskStatusSchema.enum.pending, label: "À faire"},
    {value: TaskStatusSchema.enum.in_progress, label: "En cours"},
    {value: TaskStatusSchema.enum.completed, label: "Terminée"},
];

const categoryOptions = [
    {value: TaskCategorySchema.enum.creative, label: "Créatif"},
    {value: TaskCategorySchema.enum.admin, label: "Admin"},
    {value: TaskCategorySchema.enum.meeting, label: "Réunion"},
    {value: TaskCategorySchema.enum.learning, label: "Apprentissage"},
    {value: TaskCategorySchema.enum.personal, label: "Perso"},
];

export function TaskFilters() {
    const {taskFilters, setTaskFilters, setCurrentPage} = useDashboardStore();

    function resetFilters(): void {
        setTaskFilters({category: null, status: null});
        setCurrentPage(1);
    }

    function toggleFilter(key: "status" | "category", value: string) {
        setTaskFilters({
            ...taskFilters,
            [key]: taskFilters[key] === value ? null : value
        });
        setCurrentPage(1);
    }

    return (
        <div
            className="bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-3xl p-8 border border-indigo-200/50 shadow-2xl shadow-indigo-500/10">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 text-indigo-600 font-semibold text-lg">
                    <div
                        className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <SlidersHorizontal className="w-8 h-8 text-white"/>
                    </div>
                    Filtres
                </div>
                {(taskFilters.category || taskFilters.status) && (
                    <button
                        type="button"
                        onClick={() => {
                            resetFilters()
                        }}
                        className="cursor-pointer text-sm text-indigo-600 hover:underline"
                    >
                        Réinitialiser
                    </button>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                    <span className="block text-sm font-medium text-gray-700 mb-2">Statut :</span>
                    <div className="flex flex-wrap gap-2">
                        {statusOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => toggleFilter("status", option.value)}
                                className={`cursor-pointer px-4 py-2 text-sm rounded-full border transition-all ${
                                    taskFilters.status === option.value
                                        ? "bg-indigo-500 text-white border-indigo-500 shadow"
                                        : "bg-white text-gray-600 border-gray-300 hover:bg-indigo-50"
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1">
                    <span className="block text-sm font-medium text-gray-700 mb-2">Catégorie :</span>
                    <div className="flex flex-wrap gap-2">
                        {categoryOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => toggleFilter("category", option.value)}
                                className={`cursor-pointer px-4 py-2 text-sm rounded-full border transition-all ${
                                    taskFilters.category === option.value
                                        ? "bg-purple-500 text-white border-purple-500 shadow"
                                        : "bg-white text-gray-600 border-gray-300 hover:bg-purple-50"
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}