import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";


export async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/user', async (request) =>{
        const createUserBody = z.object({
            access_token: z.string(),
        })

        const {access_token} = createUserBody.parse(request.body)

        const userResponse = await fetch('https://localhost:5555/', {
            method:'GET' ,
                headers: {
            Authorization: `Bearer ${access_token}`,
            }
        })

        const userData = await userResponse.json()

        const userInfoSchema = z.object({
            id: z.string(),
            email: z.string().email(),
            cpf: z.string(),
            pis: z.string()

        })

        const userInfo = userInfoSchema.parse(userData)

        return {userInfo}
    })
}