import z from "zod"

export interface EditPostInputDTO {
    id: string,
    content?: string,
    token: string
}

export type EditPostOutputDTO = undefined

export const EditPostSchema = z.object({
    id: z.string(),
    content: z.string().optional(),
    token: z.string().min(1)
}).transform(data => data as EditPostInputDTO)