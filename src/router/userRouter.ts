import express from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UsersController } from "../controller/UsersController"
import { UserDatabase } from "../database/UsersDatabase"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const userRouter = express.Router()

const userController = new UsersController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)

userRouter.post("/signup", userController.userSignUp)
userRouter.post("/login", userController.login)

