import {Input} from "@/components/ui/input";
import {FieldError} from "react-hook-form";
import React, {forwardRef} from "react";
import {cn} from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError | string;
    as?: "input" | "textarea";
    rows?: number;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({label, error, id, as = "input", rows = 1, className, ...props}, ref) => (
        <div className="space-y-2">
            <label htmlFor={id} className="block text-gray-700 font-medium">
                {label}
            </label>
            {as === "textarea" ? (
                <textarea
                    id={id}
                    rows={rows}
                    ref={ref as React.Ref<HTMLTextAreaElement>}
                    className={cn(
                        "w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none",
                        className
                    )}
                    {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                />
            ) : (
                <Input
                    id={id}
                    ref={ref as React.Ref<HTMLInputElement>}
                    className={className}
                    {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                />
            )}
            {error && (
                <span className="text-sm text-red-500">{typeof error === "string" ? error : error.message}</span>
            )}
        </div>
    )
);

InputField.displayName = "InputField";
export default InputField;