import z from "zod"
import { PostModel } from "../types"

export interface GetPostInputDTO {
    q?: string,
    token: string
}

export type GetPostOutputDTO = PostModel[]

export const GetPostSchema = z.object({
    q:z.string().optional(),
    token: z.string().min(1)
}).transform(data => data as GetPostInputDTO)