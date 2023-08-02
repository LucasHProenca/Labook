import express from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostController } from "../controller/PostsController"
import { PostDatabase } from "../database/PostsDatabase"

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase()
    )
)

postRouter.get("/", postController.getPosts)
postRouter.post("/", postController.createPost)
postRouter.put("/:id", postController.editPost)
postRouter.delete("/:id", postController.deletePosts)