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
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "6 caractères minimum")
});

type FormValues = z.infer<typeof schema>;

const fields = [
    {name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "Entrez votre email"},
    {
        name: "password",
        label: "Mot de passe",
        type: "password",
        autoComplete: "password",
        placeholder: "Votre mot de passe"
    },
];

export default function LoginForm() {
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
        console.log("Form data:", data);
        try {
            await authFacade.login(data)
            router.push("/dashboard");
        } catch (error) {
            toast((error as Error).message)
        }
    }

    async function loginWithOAuth2(): Promise<void> {
        try {
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
        } catch (error) {
            toast((error as Error).message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-xl shadow-md ">
            <h2 className="text-2xl font-bold mb-4 text-center app-title-gradient">Connexion</h2>
            <button
                type="button"
                onClick={loginWithOAuth2}
                className="btn-primary w-full"
            >
                <span className="flex items-center justify-center">
                    Se connecter avec Google
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
            <button type="submit" className="mx-auto btn-primary">Se connecter
            </button>
            {/* Todo: faire page oublie mot de passe + envoie de mail */}
            <div className="text-center">
                <a href="#" className="text-sm text-indigo-500 hover:underline">Mot de passe oublié ?</a>
            </div>
        </form>
    );
}