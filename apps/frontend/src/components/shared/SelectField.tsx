import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Controller, Control, FieldError} from "react-hook-form"

interface Option {
    label: string
    value: string
}

interface SelectFieldProps {
    name: string
    label: string
    control: Control<any>
    options: Option[]
    error?: FieldError
    placeholder?: string
    className?: string
}

export const SelectField = ({
                                name,
                                label,
                                control,
                                options,
                                error,
                                placeholder = "Sélectionner une option",
                                className = "w-full rounded-xl cursor-pointer",
                            }: SelectFieldProps) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <Controller
                control={control}
                name={name}
                render={({field}) => (
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
                        <SelectTrigger className={className}>
                            <SelectValue placeholder={placeholder}/>
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            {error && (
                <p className="text-sm text-red-500 mt-1">{error.message}</p>
            )}
        </div>
    )
}
