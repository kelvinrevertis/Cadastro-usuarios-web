import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { api } from "../hooks/axios"
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import Link from "next/link"


function Dashboard({ userName }) {
    const arrayName = userName.split(" ")
    const firstName = arrayName[0]


    const route = useRouter();
    return (


        <div>

            <h1>Olá {firstName} </h1>
            <Link href="/update" >Editar perfil</Link>

        </div>


    )
}

export default Dashboard

export const getServerSideProps = async (ctx) => {
    const { ['register.token']: token } = parseCookies(ctx)

    if (!token) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            }
        }
    }
    const { data: user } = await api.get('/login', { headers: { authorization: `Bearer ${token}` } })

    const userName = user.user.name
    return {
        props: { userName }
    }
}
