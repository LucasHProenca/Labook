import express from "express"
import { UsersController } from "../controller/UsersController"

export const userRouter = express.Router()

const userController = new UsersController()

userRouter.post("/signup", userController.userSignUp)
// userRouter.post("/login", userController.userLogin) FAZER DPS

