import {StickyNote, X} from 'lucide-react';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import InputField from '@/components/shared/InputField'; // ton composant
import {useEffect} from 'react';
import {SelectField} from "@/components/shared/SelectField";
import * as React from "react";
import {toast} from "sonner";
import {DashboardFacade} from "@/services/facade/dashboard.facade";
import {Task} from "@moodflow/types";

const schema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    description: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high']),
    category: z.enum(['creative', 'admin', 'meeting', 'learning', 'personal']),
    estimatedDuration: z.coerce.number().min(1, "Durée minimale : 1 minute")
});

type FormValues = z.infer<typeof schema>;

interface CreateTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateTaskModal({isOpen, onClose}: CreateTaskModalProps) {
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            priority: 'medium',
            category: 'creative',
            estimatedDuration: 60
        }
    });

    const dashboardService = new DashboardFacade()

    async function submit(data: Partial<Task>): Promise<void> {
        try {
            await dashboardService.createTask(data)
            onClose();
            reset();
        } catch (error) {
            toast((error as Error).message)
        }
    };

    // Reset le form quand la modale est fermée
    useEffect(() => {
        if (!isOpen) reset();
    }, [isOpen, reset]);

    if (!isOpen) return null;

    return (
        <div onClick={() => onClose()}
             className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div
                onClick={(event) => {
                    event.stopPropagation()
                }}
                className="w-full max-w-xl rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl border border-gray-200
                overflow-hidden animate-fade-in">

                <div
                    className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <StickyNote/>
                    <h2 className="text-lg font-semibold">
                        Créer une tâche</h2>
                    <button onClick={onClose} className="cursor-pointer hover:bg-white/10 rounded-full p-1">
                        <X className="w-5 h-5"/>
                    </button>
                </div>

                <form onSubmit={handleSubmit(submit)} className="px-6 py-6 space-y-5">
                    <InputField label="Titre *" id="title" {...register('title')} error={errors.title}/>
                    <InputField
                        label="Description"
                        id="description"
                        {...register("description")}
                        error={errors.description}
                        as="textarea"
                        rows={3}
                        className="resize-y"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <SelectField
                            control={control}
                            name="priority"
                            label="Priorité *"
                            options={[
                                {label: "Basse", value: "low"},
                                {label: "Moyenne", value: "medium"},
                                {label: "Haute", value: "high"},
                            ]}
                            error={errors.priority}
                        />

                        <SelectField
                            control={control}
                            name="category"
                            label="Catégorie *"
                            error={errors.category}
                            options={[
                                {label: "Créatif", value: "creative"},
                                {label: "Administratif", value: "admin"},
                                {label: "Réunion", value: "meeting"},
                                {label: "Apprentissage", value: "learning"},
                                {label: "Personnel", value: "personal"},
                            ]}
                        />
                    </div>

                    <InputField
                        label="Durée estimée (minutes) *"
                        id="estimatedDuration"
                        type="number"
                        {...register('estimatedDuration')}
                        error={errors.estimatedDuration}
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-200 transition"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow hover:shadow-lg transition hover:scale-105"
                        >
                            Créer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
