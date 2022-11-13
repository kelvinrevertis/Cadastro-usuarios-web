import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";

type FormValue = {
    name: { value: string }
    email: { value: string }
    cpf: { value: string }
    pis: { value: string }
    password: { value: string }
    country: { value: string }
    state: { value: string }
    city: {value: string}
    cep: { value: string }
    street: { value: string }
    number: { value: string }
    complement: { value: string }

}


export function RegisterUser() {

    // const [userName, setUserName] = useState((''));
    // const [userEmail, setUserEmail] = useState((''));
    // const [userCpf, setUserCpf] = useState((''));
    // const [userPis, setUserPis] = useState((''));
    // const [userPassword, setUserPassword] = useState((''));
    // const [userCountry, setUserCountry] = useState((''));
    // const [userCep, setUserCep] = useState ('')
    // const [userState, setUserState] = useState((''));
    // const [userStreet, setUserStreet] = useState((''));
    // const [userNumber, setUserNumber] = useState((''));
    // const [userComplement, setUserComplement] = useState((''));



    async function createUser(event: FormEvent) {

        const target = event.target as unknown as FormValue

        event.preventDefault()

        try {
            await api.post('/create-user', {

                name: target.name.value,
                email: target.email.value,
                cpf: target.cpf.value,
                pis: target.pis.value,
                password: target.password.value,
                country: target.country.value,
                state: target.state.value,
                city: target.city.value,
                cep: target.cep.value,
                street: target.street.value,
                number: target.number.value,
                complement: target.complement.value,

                //name:  userName,
                // email: userEmail,
                // cpf: userCpf,
                // pis: userPis,
                // password: userPassword,
                // country: userCountry,
                // cep: userCep,
                // state: userState,
                // street: userStreet,
                // number: userNumber,
                // complement: userComplement,
            });

            alert(`Usuário ${target.name} criado com sucesso!`)



        } catch (error) {
            alert('Falha ao criar o usuario!')

        } finally {
            
            const form = event.target as HTMLFormElement;
            form.reset()
        }
    }
    return (
        <>
            <form onSubmit={createUser}>
                <input type="text" name="name" required placeholder="Nome" />

                <input type="text" name="email" required placeholder="E-mail" />

                <input type="text" name="cpf" required placeholder="CPF" />

                <input type="text" name="pis" placeholder="PIS" />

                <input type="text" name="password" required placeholder="Password" />

                <input type="text" name="country" placeholder="País" />

                <input type="text" name="state" placeholder="Estado" />

                <input type="text" name="city" placeholder="Cidade" />

                <input type="text" name="cep" placeholder="CEP" />

                <input type="text" name="street" placeholder="Rua" />

                <input type="text" name="number" placeholder="Numero" />

                <input type="text" name="complement" placeholder="Complemento" />

                {/* <input type="text" name="name" required placeholder="Nome"
                    onChange={event => setUserName(event.target.value)} />

                <input type="text" name="email" required placeholder="E-mail"
                    onChange={event => setUserEmail(event.target.value)} />

                <input type="text" name="cpf" required placeholder="CPF"
                    onChange={event => setUserCpf(event.target.value)} />

                <input type="text" name="pis" placeholder="PIS"
                    onChange={event => setUserPis(event.target.value)} />

                <input type="text" name="password" required placeholder="Password"
                    onChange={event => setUserPassword(event.target.value)} />

                <input type="text" name="country" placeholder="País"
                    onChange={event => setUserCountry(event.target.value)} />

                <input type="text" name="state" placeholder="Estado"
                    onChange={event => setUserState(event.target.value)} />

                <input type="text" name="cep" placeholder="CEP"
                    onChange={event => setUserCep(event.target.value)} />

                <input type="text" name="street" placeholder="Rua"
                    onChange={event => setUserStreet(event.target.value)} />

                <input type="text" name="number" placeholder="Numero"
                    onChange={event => setUserNumber(event.target.value)} />

                <input type="text" name="complement" placeholder="Complemento"
                    onChange={event => setUserComplement(event.target.value)} /> */}

                <button type="submit">Cadastrar</button>
            </form>
        </>
    )
}
