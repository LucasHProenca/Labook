import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../database/UsersDatabase";
import { Users } from "../models/Users";
import { UserDB } from "../types";

export class UsersController {
    public userSignUp = async (req: Request, res: Response) => {
        try {
            
            const input = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }

            const userBusiness = new UserBusiness()
            const user = await userBusiness.userSignUp(input)

            res.status(201).send(user)
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

    public userLogin = async (req: Request, res: Response) => {
        try {

            const {id, name, email, password, role} = req.body

            if (typeof id !== "string") {
                res.statusCode = (400)
                throw new Error("'id' deve ser do tipo string")
            }

            const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
            if (typeof name !== "string" || !name.match(nameRegex)) {
                res.statusCode = (400)
                throw new Error("'name' deve ser do tipo string e deve conter apenas letras")
            }

            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            if (typeof email !== "string" || !email.match(emailRegex)) {
                res.statusCode = (400)
                throw new Error("'email' deve ter o formato adequado")
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/
            if (typeof password !== "string" || !password.match(passwordRegex)) {
                res.statusCode = (400)
                throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
            }

            const userDatabase = new UserDatabase()
            const userDBExists = await userDatabase.findUserByEmail(email)

            if (!userDBExists) {
                res.status(400)
                throw new Error("'email' não cadastrado")
            }

            // FAZER VERIFICAÇÃO SE O EMAIL E A SENHA ESTÃO CORRETOS
            // Também estou na duvida nessas duas consts abaixo

            const user = new Users(
                id,
                name,
                email,
                password,
                role,
                new Date().toISOString()
            )

            const newUser: UserDB = {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole(),
                created_at: user.getCreatedAt()
            }


            // Precisa fazer a função de login antes de ter o await aqui

            res.status(200).send({message: "Um token jwt"})
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