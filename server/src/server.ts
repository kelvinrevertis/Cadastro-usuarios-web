import Fastify from "fastify";
import { PrismaClient } from '@prisma/client'
import z from 'zod'
import cors from '@fastify/cors'

const prisma = new PrismaClient({
    log: ['query'],
})

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })


    fastify.get('/login', async () => {
        const users = await prisma.user


        return { users }
    })

    fastify.post('/create-user', async (request, reply) => {

        const createUserBody = z.object({
            name: z.string(),
            email: z.string(),
            cpf: z.string(),
            pis: z.string(),
            password: z.string(),
            country: z.string(),
            state: z.string(),
            city: z.string(),
            cep: z.string(),
            street: z.string(),
            number: z.string(),
            complement: z.string(),
        })

        const { name, cpf, email, pis, password, country, state, cep, city, street, number, complement } = createUserBody.parse(request.body)

        const userAndAddress = await prisma.user.create({

            data: {
                name,
                email,
                cpf,
                pis,
                password,

                userAdresses: {
                    create: {
                        country,
                        state,
                        city,
                        cep,
                        street,
                        number,
                        complement,
                    }
                }
            }
        })

        return reply.status(201).send({ userAndAddress })
    })

    await fastify.listen({ port: 3333 })
}

bootstrap()