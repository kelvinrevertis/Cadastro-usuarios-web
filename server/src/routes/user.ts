import { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { BodyParams, IdParam } from "../server";
import jwt from "jsonwebtoken"

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

export async function userRoutes(fastify: FastifyInstance) {

    fastify.get<{ Body: BodyParams; Params: IdParam }>('/user/:id', async (request, reply) => {
        const { id } = request.params;
        const user = await prisma.user.findUnique({
            where: {
                id: String(id),
            },
            include: {
                userAdresses: {
                    where: {
                        userId: String(id)
                    }
                }
            }
        })

        return reply.status(200).send(user)
    })


    fastify.get<{ Body: BodyParams; Params: IdParam }>('/user', async (request, reply) => {
        const { id, userId } = request.params;

        const user = await prisma.user.findMany({
            where: {
                id,
            },
            include: {
                userAdresses: {
                    where: {
                        userId
                    }
                }
            }
        })

        return { user }
    })


    fastify.put<{ Body: BodyParams; Params: IdParam }>('/user/:id', async (request, reply) => {
        const { id, userId } = request.params
        const { name, cpf, email, pis, password, country, state, cep, city, street, number, complement } = request.body
        const getAddress = await prisma.address.findFirst({
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
            },
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

    fastify.post<{ Body: BodyParams; Params: IdParam }>('/user', async (request, reply) => {
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

    fastify.post<{ Body: BodyParams }>('/signin', async (request/*: FastifyRequest<{Body:{email:string,password:string}}>*/, reply) => {
        const { email, password } = request.body
        try {
            const user = await prisma.user.findFirstOrThrow({
                where: {
                    password: password,
                    OR: [
                        { email: email },
                        { cpf: email },
                        { pis: email }
                    ]
                }
            })
            const token = jwt.sign(user.id, String(process.env.SECRET_TOKEN))

            return reply.status(200).send({ user, token })

        } catch (error) {
            console.log(error)
            return reply.status(401).send("Not authorized")
        }
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

    fastify.get<{ Headers: { authorization: string } }>('/login', async (request, reply) => {
        if (!request.headers.authorization) {
            return reply.status(401).send('token missing')
        }
        const token = request.headers.authorization.split(' ')[1]
        const id = jwt.verify(token, String(process.env.SECRET_TOKEN))
        const user = await prisma.user.findUnique({
            where: {
                id: String(id),
            },
            include: {
                userAdresses: {
                    where: {
                        userId: String(id)
                    }
                }
            }
        })
        console.log('ID:', id)
        console.log('USUARIO E ENDEREÇO:', user?.userAdresses[0].country)
        return reply.status(200).send({ user })

    })

}

//user ? { user: user.name } : "teste"