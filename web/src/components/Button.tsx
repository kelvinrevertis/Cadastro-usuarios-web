import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLInputElement>{

}

export function Button(props: ButtonProps){
    return(
        <button {...props} 
        className='bg-turquoise-700 hover:bg-turquoise-500 
        text-white items-center shadow-shadowBotton shadow-turquoise-800 w-36'
        />
    )
}
