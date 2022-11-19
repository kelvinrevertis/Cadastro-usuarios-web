import { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "../contexts/AuthContext";
import { useForm } from 'react-hook-form'
import { parseCookies } from "nookies";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { FormDiv } from "../components/FormDiv";
import { LinkButton } from "../components/LinkButton";

export default function SignIn() {
    const { register, handleSubmit } = useForm();

    const { signIn } = useContext(AuthContext)

    async function handleSignIn(data) {
        await signIn(data)
    }

    return (

        <FormDiv>
            <h1 className="text-4xl font-medium mt-40 mb-5">Olá visitante!</h1>
            <form className=" w-4/5 items-center " onSubmit={handleSubmit(handleSignIn)}>

                <Input type="text" placeholder="E-mail, CPF ou PIS" {...register('email')} />

                <Input type="password" placeholder="password" {...register('password')} />

                <div className=" flex justify-center gap-6 pt-4">

                    <Button type="submit">SignIn</Button>

                    <LinkButton href="/registeruser" children='Cadastrar' />
                </div>
            </form>
        </FormDiv >
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

