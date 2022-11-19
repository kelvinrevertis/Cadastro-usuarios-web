import { api } from "../hooks/axios"
import { parseCookies, destroyCookie } from 'nookies'
import Link from "next/link"
import { LinkButton } from "../components/LinkButton"
import { useRouter } from 'next/router'
import { Button } from "../components/Button"
import { FormDiv } from "../components/FormDiv"



function Dashboard({ userName }) {

    const router = useRouter()
    const arrayName = userName.split(" ")
    const firstName = arrayName[0]

    function logout() {
        alert('Usuario deslogado!')
        destroyCookie(null, 'register.token')
        router.push('/signin')
        
    }

    return (

        <FormDiv>

            <h1 className="text-4xl font-medium mt-40">Olá {firstName} </h1>
            <div className=" flex justify-center gap-6 pt-4">
            <LinkButton href="/update" >Editar perfil</LinkButton>
            <Button onClick={logout} key={'SECONDARY'}>Logout</Button>
            </div>
        </FormDiv>
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
