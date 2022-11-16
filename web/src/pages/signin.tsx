import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthContext } from "../contexts/AuthContext";

export default function SignIn() {
    const router = useRouter()
    const auth = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function handleLogin() {
        console.log("teste")
        if (email && password) {
            console.log("teste2")
            try {
                router.push('/dashboard')
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (

        <div>
            <h1>Olá visitante!</h1>

            <input type="text" value={email} placeholder="E-mail, CPF ou PIS"
                onChange={event => setEmail(event.target.value)} />
            <input type="text" value={password} placeholder="senha"
                onChange={event => setPassword(event.target.value)} />
            <button onClick={handleLogin} >SignIn</button>
            <Link href="/registeruser" >Cadastrar</Link>


        </div>
    )

}

