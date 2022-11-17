import { api } from "../hooks/axios"
import { parseCookies, destroyCookie } from 'nookies'
import { useRouter } from 'next/router'
import Link from "next/link"

export function logout(ctx) {
    alert('Usuario deslogado!')
    destroyCookie(ctx, 'register.token')
    console.log('teste')
}

function Dashboard({ userName }) {
    const arrayName = userName.split(" ")
    const firstName = arrayName[0]

    return (

        <div>

            <h1>Olá {firstName} </h1>
            <Link href="/update" >Editar perfil</Link>
            <Link href="/signin" onClick={logout} >Logout</Link>

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
