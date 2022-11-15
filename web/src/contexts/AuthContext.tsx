import { createContext, ReactNode, useState } from "react";

interface UserProps {
    name: string
    email: string
    cpf: string
    pis: string
    password: string
    country: string
    state: string
    city: string
    cep: string
    street: string
    number: string
    complement: string

}

export interface AuthContextDataProps {
    user: UserProps
    signIn: () => Promise<void>
}

interface AuthProviderProps{
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({}as UserProps)

    async function signIn() {
        console.log('está logando')
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            user: {
                name: 'Kelvin Revertis',
                email: 'kelvinrev2@hotmail.com',
                cpf: '12313446464',
                pis: '23131776546',
                password: 'Testetatasta',
                country: 'Brasil',
                state: 'Mg',
                city: 'Teofilo otoni',
                cep: '39801-000',
                street: 'Gustavo Bamberg',
                number: '99',
                complement: 'apto 301',
            }
        }}>
            { children }

        </AuthContext.Provider>
    )

}