import z from "zod"

export interface PutLikePostInputDTO {
    post_id: string,
    token: string
    like: boolean
}

export type PutLikePostOutputDTO = undefined

export const PutLikePostSchema = z.object({
    post_id: z.string().min(1),
    token: z.string().min(1),
    like: z.boolean()
}).transform(data => data as PutLikePostInputDTO)