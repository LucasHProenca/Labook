import z from "zod"

export interface PutLikePostInputDTO {
    post_id: string
    like: boolean
}

export interface PutLikePostOutputDTO {
    message: string
}

export const PutLikePostSchema = z.object({
    post_id: z.string(),
    like: z.boolean()
}).transform(data => data as PutLikePostInputDTO)