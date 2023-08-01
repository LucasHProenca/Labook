import express from "express"
import { PostController } from "../controller/PostsController"

export const postRouter = express.Router()

const postController = new PostController()

postRouter.get("/", postController.getPosts)
postRouter.post("/", postController.createPost)
postRouter.put("/:id", postController.editPost)
postRouter.delete("/:id", postController.deletePosts)