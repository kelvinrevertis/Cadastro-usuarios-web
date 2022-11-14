import Fastify from "fastify";
import cors from '@fastify/cors'

import { userRoutes } from "./routes/user";


export interface BodyParams {
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

export interface IdParam {
    id: string;
    userId: string;
}

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    await fastify.register(userRoutes)

    await fastify.listen({ port: 3333 })
}

bootstrap()