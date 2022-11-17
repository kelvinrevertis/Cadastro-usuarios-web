import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { api } from "../hooks/axios"
import {parseCookies} from 'nookies'
import {useRouter} from 'next/router'
import Link from "next/link"


function Dashboard({name}) {
    const arrayName = name.split(" ")
    const firstName = arrayName[0]


    const route = useRouter();
    return (

        <div>
            
            <h1>Olá {firstName} </h1>
            <Link href="/editprofile" >Editar perfil</Link>
            
        </div>


    )
}

export default Dashboard

export const getServerSideProps = async(ctx)=>{
    const {['register.token']: token} = parseCookies(ctx)

    if(!token){
        return{
            redirect:{
                destination:'/signin',
                permanent: false,
            }
        }
    }
    const {data:user} = await api.get('/login',{headers:{authorization:`Bearer ${token}`}})
    console.log('USER RETORNO',user ? { user: user.name } : "teste")
    const name = user.name
    console.log({name})
    return{
        props: {name}
        }
}
