"use client"

import * as React from "react"
import {useForm} from "react-hook-form"
import InputField from "@/components/shared/InputField"

import {Task} from "@moodflow/types"
import {StickyNote, X} from "lucide-react";
import {useEffect} from "react";
import {SelectField} from "@/components/shared/SelectField";

type FormValues = {
    title: string
    description?: string | null
    priority: "low" | "medium" | "high"
    category: "creative" | "admin" | "meeting" | "learning" | "personal"
    status: "pending" | "in_progress" | "completed"
    estimatedDuration: number
    actualDuration?: number | null
}

interface TaskDetailModalProps {
    task: Task | null
    open: boolean
    onOpenChange: () => void
}

export function TaskDetailModal({task, open, onOpenChange}: TaskDetailModalProps) {
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

    if (!open) return null;

    function onSubmit(data: FormValues) {
        if (!task) return

        console.log("data", data)
        //todo: do the update here
        // onSave({
        //     ...task,
        //     ...data,
        //     description: data.description || null,
        //     actualDuration: data.actualDuration ?? null,
        //     updatedAt: new Date(),
        // })

        onOpenChange()
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
        </div>
    )
}
