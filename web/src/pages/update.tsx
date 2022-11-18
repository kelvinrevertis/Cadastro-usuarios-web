import Link from "next/link";
import Router from 'next/router'
import { parseCookies } from "nookies";
import { useState } from "react";
import { api } from "../hooks/axios";
import { logout } from './dashboard'
import { Input } from "../components/Input";


function UpdateUser({ user, address }) {
    const [update, setUpdate] = useState({})

    function handleChange(event) {
        setUpdate({
            ...update,
            [event.target.name]: event.target.value
        });
    }

    async function updateUser(event) {

        event.preventDefault();

        console.log('Usuario:', update)

        try {
            await api.put(`/user/${user.id}`, update);
            console.log(user.id)

            alert('Usuario editado com sucesso!')
            console.log(update)
        } catch (erro) {

            alert('Erro ao editar usuario!')

        } finally {
            event.target.reset()
            document.location.reload();
        }
    }

    async function deleteUser(event) {
        try {
            await api.delete(`/user/${user.id}`)

            Router.push('/signin')
            alert('Usuario deletado!')

        } catch (erro) {

            alert('Erro ao deletar usuario!')

        } finally {
            logout(event)
        }
    }

    return (

        <div>
            <h1>Atualize seus dados! </h1>
            <form onSubmit={updateUser}>


                <Input type="text" name="name" placeholder={user.name} onChange={handleChange} />

                <Input type="text" name="email" placeholder={user.email} onChange={handleChange} />

                <Input type="text" name="cpf" placeholder={user.cpf} onChange={handleChange} />

                <Input type="text" name="pis" placeholder={user.pis} onChange={handleChange} />

                <Input type="text" name="password" placeholder={user.password} onChange={handleChange} />

                <Input type="text" name="country" placeholder={address.country} onChange={handleChange} />

                <Input type="text" name="state" placeholder={address.state} onChange={handleChange} />

                <Input type="text" name="city" placeholder={address.city} onChange={handleChange} />

                <Input type="text" name="cep" placeholder={address.cep} onChange={handleChange} />

                <Input type="text" name="street" placeholder={address.street} onChange={handleChange} />

                <Input type="text" name="number" placeholder={address.number} onChange={handleChange} />

                <Input type="text" name="complement" placeholder={address.complement} onChange={handleChange} />

                <button>Atualizar</button>
                <Link href="/dashboard">Retornar</Link>
            </form>
            <Link href="/signin" onClick={deleteUser}>Deletar usuario</Link>
        </div>

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
