import z from "zod"

export interface DeleteUserInputDTO {
    id: string,
    token: string
}

export type DeleteUserOutputDTO = undefined

export const DeleteUserSchema = z.object({
    id: z.string(),
    token: z.string().min(1)
}).transform(data => data as DeleteUserInputDTO)