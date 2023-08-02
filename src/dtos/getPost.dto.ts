import z from "zod"

export interface GetPostInputDTO {
    q?: string
}

export interface GetPostOutputDTO {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator: {
        creator_id: string
    }
}

export const GetPostSchema = z.object({
    q:z.string().optional()
}).transform(data => data as GetPostInputDTO)