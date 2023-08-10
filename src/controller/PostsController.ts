import { Request, Response } from "express";
import { ZodError } from "zod";
import { PostBusiness } from "../business/PostBusiness";
import { PostDatabase } from "../database/PostsDatabase";
import { UserDatabase } from "../database/UsersDatabase";
import { CreatePostSchema } from "../dtos/createPost.dto";
import { DeleteCourseSchema } from "../dtos/deletePost.dto";
import { EditPostSchema } from "../dtos/editPost.dto";
import { GetPostSchema } from "../dtos/getPost.dto";
import { PutLikePostSchema } from "../dtos/putLikePost.dto";
import { BaseError } from "../errors/BaseError";
import { Posts } from "../models/Posts";
import { PostDB } from "../types";

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ){}
    public getPosts = async (req: Request, res: Response) => {
        try {

            const input = GetPostSchema.parse({
                q: req.query.q,
                token: req.headers.authorization
            })
            
            const posts = await this.postBusiness.getPosts(input)

            res.status(200).send(posts)
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createPost = async (req: Request, res: Response) => {
        try {

            const input = CreatePostSchema.parse({
                content: req.body.content,
                token: req.headers.authorization
            })

            
            const output = await this.postBusiness.createPost(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {

            const input = EditPostSchema.parse({
                id: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            })

            const post = await this.postBusiness.editPost(input)

            res.status(200).send(post)
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deletePosts = async (req: Request, res: Response) => {
        try {

            const input = DeleteCourseSchema.parse({
                id: req.params.id,
                token: req.headers.authorization
            })

            const post = await this.postBusiness.deletePosts(input)

            res.status(200).send(post)
        } catch (error: any) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public putLikePost = async (req: Request, res: Response) => {
        try {
            
            const input = PutLikePostSchema.parse({
                post_id: req.params.id,
                token: req.headers.authorization,
                like: req.body.like
            })
    
            const post = await this.postBusiness.likeDislikePost(input)
    
            res.status(200).send(post)
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}