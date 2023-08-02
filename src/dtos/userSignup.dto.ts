import z from "zod"

export interface UserSignupInputDTO {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
}

export interface UserSignupOutputDTO {
    message: string
}

export const UserSignupSchema = z.object({
    id: z.string(),
    name: z.string().regex(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/),
    role: z.string()
}).transform(data=> data as UserSignupInputDTO)