import { InputHTMLAttributes,forwardRef } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export const Input = forwardRef<HTMLInputElement,InputProps> ((props, ref) => {
    return (
        <input {...props} ref={ref}
            className='hover:shadow-md block outline-blue-100 
        outline-2 space-y-8 flex-1 px-7 py-4 mt-2 mx-auto
        bg-white border text-sm text-black justify-between w-80'/>
    )
})

