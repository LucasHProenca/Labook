import express from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UsersController } from "../controller/UsersController"
import { UserDatabase } from "../database/UsersDatabase"

export const userRouter = express.Router()

const userController = new UsersController(
    new UserBusiness(
        new UserDatabase()
    )
)

userRouter.post("/signup", userController.userSignUp)
userRouter.post("/login", userController.login)

