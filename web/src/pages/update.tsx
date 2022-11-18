import Link from "next/link";
import { AuthContext } from "../contexts/AuthContext";
import Router, { useRouter } from 'next/router'
import { parseCookies } from "nookies";
import { FormEvent, useContext, useState } from "react";
import { api } from "../hooks/axios";
import { useForm } from "react-hook-form";
import { userAgent } from "next/server";
import { logout } from './dashboard'


function UpdateUser({ user, address }) {
    const [update, setUpdate] = useState({})

    const arrayName = user.name.split(" ")
    const firstName = arrayName[0]

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
            <h1>Olá {firstName} </h1>
            <form onSubmit={updateUser}>


                <input type="text" name="name" required placeholder={user.name} onChange={handleChange} />

                <input type="text" name="email" required placeholder={user.email} onChange={handleChange} />

                <input type="text" name="cpf" required placeholder={user.cpf} onChange={handleChange} />

                <input type="text" name="pis" required placeholder={user.pis} onChange={handleChange} />

                <input type="text" name="password" required placeholder={user.password} onChange={handleChange} />

                <input type="text" name="country" required placeholder={address.country} onChange={handleChange} />

                <input type="text" name="state" required placeholder={address.state} onChange={handleChange} />

                <input type="text" name="city" required placeholder={address.city} onChange={handleChange} />

                <input type="text" name="cep" required placeholder={address.cep} onChange={handleChange} />

                <input type="text" name="street" required placeholder={address.street} onChange={handleChange} />

                <input type="text" name="number" required placeholder={address.number} onChange={handleChange} />

                <input type="text" name="complement" required placeholder={address.complement} onChange={handleChange} />

                <button type="submit">Atualizar</button>
                <Link href="/">Retornar</Link>
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
