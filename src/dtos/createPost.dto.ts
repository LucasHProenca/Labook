import z from "zod"

export interface CreatePostInputDTO {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number
}

export interface CreatePostOutputDTO {
    message: string
}

export const CreatePostSchema = z.object ({
    id: z.string(),
    creator_id: z.string(),
    content: z.string(),
    likes: z.number(),
    dislikes: z.number()
}).transform(data => data as CreatePostInputDTO)