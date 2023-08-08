import z from "zod"

export interface UserSignupInputDTO {
    name: string,
    email: string,
    password: string,
}

export interface UserSignupOutputDTO {
    token: string
}

export const UserSignupSchema = z.object({
    name: z.string().regex(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/)

}).transform(data=> data as UserSignupInputDTO)