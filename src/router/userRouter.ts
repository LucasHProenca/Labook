import express from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UsersController } from "../controller/UsersController"
import { UserDatabase } from "../database/UsersDatabase"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokenManager"

export const userRouter = express.Router()

const userController = new UsersController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

userRouter.post("/signup", userController.userSignUp)
userRouter.post("/login", userController.login)

