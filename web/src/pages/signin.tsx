import { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "../contexts/AuthContext";
import { useForm } from 'react-hook-form'
import { parseCookies } from "nookies";

export default function SignIn() {
    const { register, handleSubmit } = useForm();

    const { signIn } = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignIn(data) {
        await signIn(data)
    }
    return (

        <div>
            <h1>Olá visitante!</h1>
            <form onSubmit={handleSubmit(handleSignIn)}>

                <input {...register('email')} type="text"
                    value={email} placeholder="E-mail, CPF ou PIS"
                    onChange={event => setEmail(event.target.value)} />

                <input {...register('password')}
                    type="text" value={password} placeholder="senha"
                    onChange={event => setPassword(event.target.value)} />

                <button>SignIn</button>
            </form>
            <Link href="/registeruser" >Cadastrar</Link>


        </div>
    )

}

export const getServerSideProps = async (ctx) => {
    const token = parseCookies(ctx)

    if (token["register.token"]) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            }
        }
    }
    return {
        props: {}
    }
}

