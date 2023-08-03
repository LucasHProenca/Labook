import z from "zod"

export interface CreatePostInputDTO {
    id: string,
    creator_id: string,
    content: string,
}

export interface CreatePostOutputDTO {
    message: string
}

export const CreatePostSchema = z.object ({
    id: z.string(),
    creator_id: z.string(),
    content: z.string()
}).transform(data => data as CreatePostInputDTO)