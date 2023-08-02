import z from "zod"

export interface DeletePostInputDTO {
    id: string
}

export interface DeletePostOutputDTO {
    message: string
}

export const DeleteCourseSchema = z.object({
    id: z.string()
}).transform(data => data as DeletePostInputDTO)