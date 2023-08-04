import z from "zod"

export interface EditPostInputDTO {
    id: string,
    content?: string
}

export interface EditPostOutputDTO {
    message: string
}

export const EditPostSchema = z.object({
    id: z.string(),
    content: z.string().optional()
}).transform(data => data as EditPostInputDTO)