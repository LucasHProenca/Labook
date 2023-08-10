import { Request, Response } from "express";
import { ZodError } from "zod";
import { UserBusiness } from "../business/UserBusiness";
import { DeleteUserSchema } from "../dtos/deleteUser.dto";
import { EditUserSchema } from "../dtos/editUser.dto";
import { GetUsersSchema } from "../dtos/getUser.dto";
import { LoginSchema } from "../dtos/userLogin.dto";
import { UserSignupSchema } from "../dtos/userSignup.dto";
import { BaseError } from "../errors/BaseError";

export class UsersController {
  constructor(
    private userBusiness: UserBusiness
  ) {}
  public userSignUp = async (req: Request, res: Response) => {
    try {
      const input = UserSignupSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      const user = await this.userBusiness.userSignUp(input)

      res.status(201).send(user)
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

  public login = async (req: Request, res: Response) => {
    try {
      const input = LoginSchema.parse({
        email: req.body.email,
        password: req.body.password
      })
      const output = await this.userBusiness.login(input)

      res.status(200).send(output)
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

  public getUsers = async (req: Request, res: Response) => {
    try {
        const input = GetUsersSchema.parse({
            token: req.headers.authorization
        })
        const users = await this.userBusiness.getUsers(input)

        res.status(200).send(users)
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

public editUser = async (req: Request, res: Response) => {
  try {
      const input = EditUserSchema.parse({
          id: req.params.id,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          token: req.headers.authorization
      })
      const user = await this.userBusiness.editUser(input)

      res.status(200).send(user)
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

public deleteUser = async (req: Request, res: Response) => {
  try {
      const input = DeleteUserSchema.parse({
          id: req.params.id,
          token: req.headers.authorization
      })
      const user = await this.userBusiness.deleteUser(input)

      res.status(200).send(user)
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
}