import { UserDatabase } from "../database/UsersDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { Users } from "../models/Users"
import { UserDB } from "../types"

export class UserBusiness {
    public userSignUp = async (input:any) => {
        const { id, name, email, password, role } = input

            if (typeof id !== "string") {
                // res.statusCode = (400)
                throw new BadRequestError("'id' deve ser do tipo string")
            }

            const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
            if (typeof name !== "string" || !name.match(nameRegex)) {
                // res.statusCode = (400)
                throw new BadRequestError("'name' deve ser do tipo string e deve conter apenas letras")
            }

            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            if (typeof email !== "string" || !email.match(emailRegex)) {
                // res.statusCode = (400)
                throw new BadRequestError("'email' deve ter o formato adequado")
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/
            if (typeof password !== "string" || !password.match(passwordRegex)) {
                // res.statusCode = (400)
                throw new BadRequestError("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
            }

            const userDatabase = new UserDatabase()
            const userDBExists = await userDatabase.findUserByEmail(email)
            const userDBIdExists = await userDatabase.findUserById(id)

            if (userDBIdExists) {
                // res.statusCode = (400)
                throw new BadRequestError("'id' já cadastrado")
            }

            if (userDBExists) {
                // res.status(400)
                throw new BadRequestError("'email' já cadastrado")
            }

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

            await userDatabase.signUp(newUser)

            const output = {
                message: "Um token jwt"
            }

            return output
    }

    // Fazer o login dps
}