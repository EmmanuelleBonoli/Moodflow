import {Input} from "@/components/ui/input";
import {FieldError} from "react-hook-form";
import {forwardRef} from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError | string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({label, error, id, ...props}, ref) => (
        <div className="space-y-2">
            <label htmlFor={id} className="block text-gray-700 font-medium">
                {label}
            </label>
            <Input id={id} ref={ref} {...props} className="w-full"/>
            {error && (
                <span className="text-sm text-red-500">{typeof error === "string" ? error : error.message}</span>
            )}
        </div>
    )
);

InputField.displayName = "InputField";
export default InputField;