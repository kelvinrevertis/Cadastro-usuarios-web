import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../hooks/axios";
import { setCookie, parseCookies } from 'nookies'
import Router, { useRouter } from 'next/router'

type User = {
    id: string
    name: string
    email: string
    cpf: string
    pis: string
    password: string
}

type SignInData = {
    email: string;
    password: string;
}

export type AuthContextTypes = {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (data: SignInData) => Promise<void>
}


interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextTypes)

export function AuthProvider({ children }: AuthProviderProps) {

    const route = useRouter();
    const { id } = route.query;

    const [user, setUser] = useState<User | null>(null);

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'register.token': token } = parseCookies();

        if (token) {
            api.get(`/login`)
                .then(response => setUser(response.data))
                .catch(error => console.log(error))
        }


    }, [api]);

    async function signIn({ email, password }: SignInData) {
        try{
            const { data: { token, user } } = await api.post('/signin', {
                email,
                password,
            })
    
            setCookie(undefined, 'register.token', token, {
                maxAge: 60 * 60 * 1, //1 hour
            })
    
            setUser(user)
    
            Router.push('/dashboard')
        }catch(error){
            console.log(error)
            alert('Não foi possível logar, verifique os seus dados!')
        }

    }


async function login() {
    const user: any = await api.get('/login')

    setUser(user)

}

return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
        {children}

    </AuthContext.Provider>
)

}