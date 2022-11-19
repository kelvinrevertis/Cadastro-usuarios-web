import { FormHTMLAttributes } from "react";

interface FormProps extends FormHTMLAttributes<HTMLInputElement> { }

export function FormDiv({ children }, props: FormProps) {
    return (
        <div {...props} className='flex flex-col items-center  '>
            {children}
        </div>
    )
}