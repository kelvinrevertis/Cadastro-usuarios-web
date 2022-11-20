import { useState } from "react";
import { api } from "../hooks/axios";
import Link from "next/link";
import { FormDiv } from "../components/FormDiv";
import { Input } from "../components/Input";
import { LinkButton } from "../components/LinkButton";
import { Button } from "../components/Button";

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

        try {
            await api.post('/user', user);

            alert(`Usuário criado com sucesso!`)

        } catch (error) {
            alert('Falha ao criar o usuario!')

        } finally {
            event.target.reset()
        }
    }
    return (
        <FormDiv>
            <h1 className="text-2xl font-medium pt-4 mb-4">Cadastro de usuários </h1>
            <form onSubmit={createUser}>
                <Input type="text" name="name" required placeholder="Nome" onChange={handleChange} />

                <Input type="text" name="email" required placeholder="E-mail" onChange={handleChange} />

                <Input type="text" name="cpf" required placeholder="CPF" onChange={handleChange} />

                <Input type="text" name="pis" placeholder="PIS" onChange={handleChange} />

                <Input type="password" name="password" required placeholder="Password" onChange={handleChange} />

                <Input type="text" name="country" placeholder="País" onChange={handleChange} />

                <Input type="text" name="state" placeholder="Estado" onChange={handleChange} />

                <Input type="text" name="city" placeholder="Cidade" onChange={handleChange} />

                <Input type="text" name="cep" placeholder="CEP" onChange={handleChange} />

                <Input type="text" name="street" placeholder="Rua" onChange={handleChange} />

                <Input type="text" name="number" placeholder="Numero" onChange={handleChange} />

                <Input type="text" name="complement" placeholder="Complemento" onChange={handleChange} />

                <div className=" flex justify-center gap-6 pt-4">
                    <Button type="submit">Cadastrar</Button>
                    <LinkButton href="/signin" >Retornar</LinkButton>
                </div>
            </form>
        </FormDiv>
    );
}

export default RegisterUser