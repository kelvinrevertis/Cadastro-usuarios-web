import { FormEvent, useState } from "react";
import { api } from "../hooks/axios";
import Link from "next/link";

function RegisterUser() {
    const [user, setUser] = useState({})

    function handleChange(event) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    async function createUser(event) {

        event.preventDefault();

        console.log(user)

        try {
            await api.post('/user', user);

            alert(`Usuário criado com sucesso!`)
            console.log(user)


        } catch (error) {
            alert('Falha ao criar o usuario!')

        } finally {
            event.target.reset()
        }
    }
    return (
        <>
            <form onSubmit={createUser}>
                <input type="text" name="name" required placeholder="Nome" onChange={handleChange} />

                <input type="text" name="email" required placeholder="E-mail" onChange={handleChange} />

                <input type="text" name="cpf" required placeholder="CPF" onChange={handleChange} />

                <input type="text" name="pis" placeholder="PIS" onChange={handleChange} />

                <input type="text" name="password" required placeholder="Password" onChange={handleChange} />

                <input type="text" name="country" placeholder="País" onChange={handleChange} />

                <input type="text" name="state" placeholder="Estado" onChange={handleChange} />

                <input type="text" name="city" placeholder="Cidade" onChange={handleChange} />

                <input type="text" name="cep" placeholder="CEP" onChange={handleChange} />

                <input type="text" name="street" placeholder="Rua" onChange={handleChange} />

                <input type="text" name="number" placeholder="Numero" onChange={handleChange} />

                <input type="text" name="complement" placeholder="Complemento" onChange={handleChange} />

                <button type="submit">Cadastrar</button>
                <Link href="/">Retornar</Link>
            </form>
        </>
    );
}

export default RegisterUser