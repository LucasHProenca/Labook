import z from "zod"
import { UserModel } from "../types"

export interface GetUserInputDTO {
    token: string
}

export type GetUserOutputDTO = UserModel[]

export const GetUsersSchema = z.object({
    token: z.string().min(1)
}).transform(data => data as GetUserInputDTO)