import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLInputElement>{}

export function Button(props: ButtonProps){
    return(
        <button {...props} 
        className='bg-turquoise-200 hover:bg-turquoise-500 
        text-white shadow-2xl shadow-turquoise-100'/>
    )
}