import Link from "next/link"


export function LinkButton({href,children},boolean){
    return(
        <Link href={href}
        className='bg-turquoise-700 hover:bg-turquoise-500 
        text-white p-4 pt-4 text-center shadow-shadowBotton shadow-turquoise-800 w-36'>{children}</Link>
    )
}