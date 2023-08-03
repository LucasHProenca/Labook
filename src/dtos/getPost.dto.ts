import z from "zod"
import { PostModel } from "../types"

export interface GetPostInputDTO {
    q?: string
}

export type GetPostOutputDTO = PostModel[]

export const GetPostSchema = z.object({
    q:z.string().optional()
}).transform(data => data as GetPostInputDTO)