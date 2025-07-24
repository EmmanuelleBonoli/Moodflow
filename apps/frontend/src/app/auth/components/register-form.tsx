"use client";

import {useForm} from "react-hook-form";
import InputField from "@/components/shared/input-field";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {RegisterUser} from "@moodflow/types/auth";
import {AuthFacade} from "@/services/facade/auth.facade";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const schema = z.object({
    name: z.string().min(2, "Nom trop court"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "6 caractères minimum"),
    passwordConfirm: z.string()
}).refine(data => data.password === data.passwordConfirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["passwordConfirm"],
});

type FormValues = z.infer<typeof schema>;

const fields = [
    {name: "name", label: "Nom", type: "text", autoComplete: "name", placeholder: "Votre nom"},
    {name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "Votre email"},
    {
        name: "password",
        label: "Mot de passe",
        type: "password",
        autoComplete: "new-password",
        placeholder: "Choisissez un mot de passe"
    },
    {
        name: "passwordConfirm",
        label: "Confirmation",
        type: "password",
        autoComplete: "new-password",
        placeholder: "Répétez le mot de passe"
    },
];

export default function RegisterForm() {
    const authFacade = new AuthFacade();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    async function onSubmit(data: FormValues): Promise<void> {
        const registerUser: RegisterUser = {
            name: data.name,
            email: data.email,
            password: data.password,
        }
        try {
            await authFacade.register(registerUser)
            toast("Inscription réussie!")
            router.push("/dashboard");
        } catch (error) {
            toast((error as Error).message)
        }
    }

    async function registerWithOAuth2(): Promise<void> {
        try {
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
        } catch (error) {
            toast((error as Error).message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 bg-white p-8 rounded-xl shadow-md max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4 text-center app-title-gradient">Inscription</h2>
            <button
                type="button"
                onClick={registerWithOAuth2}
                className="btn-primary w-full"
            >
                <span className="flex items-center justify-center">
                    S'inscrire avec Google
                </span>
            </button>


            {fields.map((field) => (
                <InputField
                    key={field.name}
                    id={field.name}
                    label={field.label}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    {...register(field.name as keyof FormValues)}
                    error={errors[field.name as keyof FormValues]}
                />
            ))}
            <button type="submit" className="btn-primary mx-auto">Créer mon compte</button>
        </form>
    );
}