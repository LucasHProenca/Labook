import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostDatabase } from "../database/PostsDatabase";
import { UserDatabase } from "../database/UsersDatabase";
import { Posts } from "../models/Posts";
import { PostDB } from "../types";

export class PostController {
    public getPosts = async (req: Request, res: Response) => {
        try {

            const input = {
                q: req.query.q
            }
            const postBusiness = new PostBusiness()
            const posts = await postBusiness.getPosts(input)

            res.status(200).send(posts)
        } catch (error: any) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createPost = async (req: Request, res: Response) => {
        try {

            const input = {
                id: req.body.id,
                creator_id: req.body.creator_id,
                content: req.body.content,
                likes: req.body.likes,
                dislikes: req.body.dislikes
            }

            const postBusiness = new PostBusiness()
            const posts = await postBusiness.createPost(input)

            res.status(201).send({ posts })
        } catch (error: any) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {

            const input = {
                id: req.params.id,
                newContent: req.body.content
            }

            const postBusiness = new PostBusiness()
            const post = await postBusiness.editPost(input)

            res.status(200).send(post)
        } catch (error: any) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public deletePosts = async (req: Request, res: Response) => {
        try {

            const input = {
                id: req.params.id
            }

            const postBusiness = new PostBusiness()
            const post = await postBusiness.deletePosts(input)

            res.status(200).send(post)
        } catch (error: any) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}