import Router, { useRouter } from 'next/router'
import { destroyCookie, parseCookies } from "nookies";
import { useRef, useState } from "react";
import { api } from "../hooks/axios";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import { FormDiv } from "../components/FormDiv";
import { LinkButton } from "../components/LinkButton";
import { Button } from "../components/Button";


function UpdateUser({ user, address }) {
    const { register, handleSubmit } = useForm();
    const [userData, setUserData] = useState({ ...user, ...address })
    const formRef = useRef(null)
    const router = useRouter()

    function logout() {
        alert('Usuario deslogado!')
        destroyCookie(null, 'register.token')
        router.push('/signin')

    }

    const updateUser = handleSubmit(async (data) => {
        try {
            await api.put(`/user/${user.id}`, data);
            setUserData(prevState => ({ ...prevState, ...data }))
            alert('Usuario editado com sucesso!')
        } catch (erro) {

            alert('Erro ao editar usuario!')

        } finally {
            formRef.current.reset()
        }
    })

    async function deleteUser() {
        try {
            await api.delete(`/user/${user.id}`)

            Router.push('/signin')
            alert('Usuario deletado!')

        } catch (erro) {

            alert('Erro ao deletar usuario!')

        } finally {
            logout()
        }
    }

    return (

        <FormDiv>
            <h1 className="text-2xl font-medium mb-4">Atualize seus dados! </h1>
            <form onSubmit={updateUser} ref={formRef}>

                <Input type="text" required name="name" placeholder={userData.name} {...register('name')} />

                <Input type="text" required name="email" placeholder={userData.email} {...register('email')} />

                <Input type="text" required name="cpf" placeholder={userData.cpf} {...register('cpf')} />

                <Input type="text" required name="pis" placeholder={userData.pis} {...register('pis')} />

                <Input type="password" required name="password" placeholder='***********' {...register('password')} />

                <Input type="text" required name="country" placeholder={userData.country} {...register('country')} />

                <Input type="text" required name="state" placeholder={userData.state} {...register('state')} />

                <Input type="text" required name="city" placeholder={userData.city} {...register('city')} />

                <Input type="text" required name="cep" placeholder={userData.cep} {...register('cep')} />

                <Input type="text" required name="street" placeholder={userData.street} {...register('street')} />

                <Input type="text" required name="number" placeholder={userData.number} {...register('number')} />

                <Input type="text" name="complement" placeholder={userData.complement} {...register('complement')} />

                <div className=" flex justify-center gap-6 pt-4">
                    <Button>Atualizar</Button>
                    <LinkButton href="/dashboard">Retornar</LinkButton>

                    <button className='bg-carmine-700 hover:bg-carmine-500 
                    text-white p-4 shadow-shadowBotton shadow-carmine-800 w-36'
                    onClick={deleteUser}>Deletar usuario</button>
                </div>
            </form>
        </FormDiv>
    )
}

export default UpdateUser

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
    const { data: userData } = await api.get('/login', { headers: { authorization: `Bearer ${token}` } })

    const user = userData.user
    const address = userData.user.userAdresses[0]
    return {
        props: { user, address }
    }
}
