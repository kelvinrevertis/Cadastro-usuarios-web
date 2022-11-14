import Fastify from "fastify";
import { PrismaClient } from '@prisma/client'
import z, { string } from 'zod'
import cors from '@fastify/cors'


const prisma = new PrismaClient({
    log: ['query'],
})

interface BodyParams {
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

interface IdParam {
    id: string;
    userId: string;
}

const userBody = z.object({
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

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })


    fastify.get<{ Body: BodyParams; Params: IdParam }>('/user/:id', async (request, reply) => {
        const { id } = request.params;
        const users = await prisma.user.findUnique({
            where: {
                id,
            }
        })

        return reply.status(200).send(users ? { user: users.name } : "teste")
    })

    fastify.get<{ Body: BodyParams; Params: IdParam }>('/user', async () => {


        const users = await prisma.user.findMany()

        return { users }
    })



    fastify.put<{ Body: BodyParams; Params: IdParam }>('/user/:id', async (request, reply) => {
        const { id, userId } = request.params
        const { name, cpf, email, pis, password, country, state, cep, city, street, number, complement } = request.body

        const getAddress: any = await prisma.address.findFirst({
            where: {
                userId
            },
        })


        const address = await prisma.address.update({
            where: {
                id: getAddress!.id
            },
            data: {
                country,
                state,
                city,
                cep,
                street,
                number,
                complement,
            }
        })
        const user = await prisma.user.update({
            where: {
                id,
            },
            data: {
                name,
                email,
                cpf,
                pis,
                password,
            }
        })
        return reply.status(200).send({ user, address })
    })

    fastify.post('/user', async (request, reply) => {

        const { name, cpf, email, pis, password, country, state, cep, city, street, number, complement } = userBody.parse(request.body)

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

    fastify.delete<{ Params: IdParam }>('/user/:id', async (request, reply) => {

        const { id } = request.params;

        await prisma.user.delete({
            where: {
                id,
            },
        })

        return reply.send('usuario removido!')
    })


    await fastify.listen({ port: 3333 })
}

bootstrap()