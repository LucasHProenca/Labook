import z, { string } from "zod"

export interface EditUserInputDTO {
    id: string,
    name?: string,
    email?: string,
    password?: string,
    token: string
}

export type EditUserOutputDTO = undefined

export const EditUserSchema = z.object({
    id: string(),
    name: z.string().min(4).optional(),
    email: z.string().email().optional(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/).optional(),
    token: z.string().min(1)
}).transform(data => data as EditUserInputDTO)