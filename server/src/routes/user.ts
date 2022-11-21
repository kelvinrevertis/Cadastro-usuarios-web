import { FastifyInstance, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { prisma } from "../lib/prisma";
import { BodyParams, IdParam } from "../server";
import jwt from "jsonwebtoken"

const userBody = z.object({
    name: z.string(),
    email: z.string().email('E-mail inválido!'),
    cpf: z.string(),
    pis: z.string(),
    password: z.string().min(6, "Valor minimo de caracteres: 6"),
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
            select: {
                id: true,
                name: true,
                cpf: true,
                email: true,
                pis: true,
                userAdresses: true
            },

        })

        return reply.status(200).send(user)
    })


    fastify.get('/user', async () => {

        const user = await prisma.user.findMany({
            include: {
                userAdresses: true
            }
        })

        return { user }
    })


    fastify.put<{ Body: BodyParams; Params: IdParam }>('/user/:id', async (request, reply) => {
        const { id } = request.params
        const { name, cpf, email, pis, password, country, state, cep, city, street, number, complement } = request.body


        const getUser = await prisma.user.findUnique({
            where: {
                id: String(id),
            },
            include: {
                userAdresses: true
            }
        })
        if (!getUser) {
            return reply.status(404).send({ mensagem: 'Usuário não encontrado!' })
        }
        await prisma.address.update({
            where: {
                id: getUser.userAdresses!.id
            },
            data: {
                country,
                state,
                city,
                cep,
                street,
                number,
                complement
            }
        })
        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                cpf,
                pis,
                password
            }
        })
        return reply.status(200).send({ user })

    })

    fastify.post<{ Body: BodyParams; Params: IdParam }>('/user', async (request, reply) => {
        try {
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

        } catch (error: any) {

            if (error instanceof ZodError) {
                return reply.status(400).send({message: error.errors, type: 'Erro de validação'})
            }
            return reply.status(400).send({message: error.message, type:'Erro database'})

        }

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
                userAdresses: true
            }
        })

        return reply.status(200).send({ user })

    })

}

//user ? { user: user.name } : "teste"