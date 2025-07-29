"use client"

import * as React from "react"
import {useForm} from "react-hook-form"
import InputField from "@/components/shared/InputField"
import {z} from "zod"
import {Task, TaskCategorySchema, TaskPrioritySchema, TaskStatusSchema} from "@moodflow/types"
import {StickyNote, X} from "lucide-react";
import {useEffect} from "react";
import {SelectField} from "@/components/shared/SelectField";
import {DashboardFacade} from "@/services/facade/dashboard.facade"
import {toast} from "sonner";
import {ConfirmDialog} from "@/components/shared/ConfirmDialog";

type FormValues = {
    title: string
    description?: string | null
    priority: z.infer<typeof TaskPrioritySchema>;
    category: z.infer<typeof TaskCategorySchema>;
    status: z.infer<typeof TaskStatusSchema>;
    estimatedDuration: number
    actualDuration?: number | null
}

interface TaskDetailModalProps {
    task: Task | null
    onOpenChange: () => void
}

export function TaskDetailModal({task, onOpenChange}: TaskDetailModalProps) {
    const dashboardService = new DashboardFacade();
    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = React.useState(false);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors, isSubmitting},
    } = useForm<FormValues>({
        defaultValues: task
            ? {
                title: task.title,
                description: task.description ?? "",
                priority: task.priority,
                category: task.category,
                status: task.status,
                estimatedDuration: task.estimatedDuration,
                actualDuration: task.actualDuration ?? 0,
            }
            : undefined,
    })

    useEffect(() => {
        if (task) {
            reset({
                title: task.title,
                description: task.description ?? "",
                priority: task.priority,
                category: task.category,
                status: task.status,
                estimatedDuration: task.estimatedDuration,
                actualDuration: task.actualDuration ?? 0,
            })
        }
    }, [task, reset])

    async function onSubmit(data: FormValues): Promise<void> {
        if (!task) return

        const updatedTask = {
            ...task,
            ...data,
            description: data.description || null,
            actualDuration: data.actualDuration ?? null,
            updatedAt: new Date(),
            completedAt: data.status === "completed" ? new Date() : null,
        }
        try {
            await dashboardService.updateTask(updatedTask);
            toast.success("Tâche mise à jour.");
            onOpenChange()
        } catch (error) {
            toast((error as Error).message)
        }
    }

    async function handleDelete() {
        if (!task) return;

        try {
            await dashboardService.deleteTask(task.id);
            toast.success("Tâche supprimée.");
            onOpenChange();
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    return (
        <div
            onClick={() => onOpenChange()}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div
                onClick={(event) => {
                    event.stopPropagation()
                }}
                className="w-full max-w-xl rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in">

                <div
                    className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <StickyNote/>
                    <h2 className="text-lg font-semibold">
                        Détails de la tâche</h2>
                    <button onClick={() => onOpenChange()}
                            className="cursor-pointer hover:bg-white/10 rounded-full p-1">
                        <X className="w-5 h-5"/>
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6 space-y-5">
                    <InputField
                        label="Titre"
                        {...register("title", {required: "Le titre est requis"})}
                        error={errors.title}
                    />

                    <InputField
                        label="Description"
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
                    <SelectField
                        control={control}
                        name="status"
                        label="Status *"
                        error={errors.category}
                        options={[
                            {label: "En attente", value: "pending"},
                            {label: "En cours", value: "in_progress"},
                            {label: "Terminée", value: "completed"},
                        ]}
                    />

                    <InputField
                        label="Durée estimée (minutes)"
                        type="number"
                        {...register("estimatedDuration", {
                            required: "Durée estimée requise",
                            min: {value: 0, message: "Valeur minimale 0"},
                        })}
                        error={errors.estimatedDuration}
                    />

                    <InputField
                        label="Durée réelle (minutes)"
                        type="number"
                        {...register("actualDuration", {
                            min: {value: 0, message: "Valeur minimale 0"},
                        })}
                        error={errors.actualDuration}
                    />

                    <div className="mt-6 flex justify-end space-x-2">
                        <button
                            type="button"
                            className="text-red-600 hover:underline text-sm"
                            onClick={() => setIsOpenConfirmDelete(true)}
                        >
                            Supprimer
                        </button>

                        <button type="button"
                                className="cursor-pointer px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-200 transition"
                                onClick={() => onOpenChange()}>
                            Annuler
                        </button>
                        <button
                            className="cursor-pointer px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow hover:shadow-lg transition hover:scale-105"
                            type="submit" disabled={isSubmitting}>
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div>

            {isOpenConfirmDelete ? (
                <ConfirmDialog onCancel={() => setIsOpenConfirmDelete(false)} onConfirm={() => handleDelete()}/>
            ) : null}
        </div>
    )
}
