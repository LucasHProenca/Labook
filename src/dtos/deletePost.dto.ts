import z from "zod"

export interface DeletePostInputDTO {
    id: string,
    token: string
}

export interface DeletePostOutputDTO {
    message: string
}

export const DeleteCourseSchema = z.object({
    id: z.string(),
    token: z.string().min(1)
}).transform(data => data as DeletePostInputDTO)