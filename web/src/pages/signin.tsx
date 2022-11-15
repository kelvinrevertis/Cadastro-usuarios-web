import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth"
import Link from "next/link";
import { api } from "../lib/axios";


export function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        console.log("submit", {email, password})
    }

    const { signIn, user } = useAuth();

    // async function handleSignIn() {

    // }
    async function signinUser(event){

    }

    console.log('Dados do usuário =>', user)

    // try {
        await api.post('/signin', user);

        alert(`Usuário criado com sucesso!`)
        console.log(user)


    // } catch (error) {
    //     alert('Falha ao criar o usuario!')

    // } finally {
    //     event.target.reset()
    // }

return (
    <>
        <h1>Olá visitante!</h1>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder="E-mail, CPF ou PIS"
                onChange={event => setEmail(event.target.value)} />
            <input type="text" placeholder="senha"
                onChange={event => setPassword(event.target.value)} />
            <button onClick={signIn}>SignIn</button>
            <Link href="/registeruser" >Cadastrar</Link>
        </form>

    </>
    )
}