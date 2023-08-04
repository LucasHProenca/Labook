import { UserDatabase } from "../database/UsersDatabase"
import { LoginInputDTO, LoginOutputDTO } from "../dtos/userLogin.dto"
import { UserSignupInputDTO, UserSignupOutputDTO } from "../dtos/userSignup.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Users } from "../models/Users"
import { UserDB } from "../types"

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase
    ){}
    public userSignUp = async (input:UserSignupInputDTO): Promise<UserSignupOutputDTO> => {
        const { id, name, email, password, role } = input

            const userDBExists = await this.userDatabase.findUserByEmail(email)
            const userDBIdExists = await this.userDatabase.findUserById(id)

            if (userDBIdExists) {
                throw new BadRequestError("'id' já cadastrado")
            }

            if (userDBExists) {
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

            await this.userDatabase.signUp(newUser)

            const output: UserSignupOutputDTO = {
                message: "Um token jwt"
            }

            return output
    }

    public login = async (
        input: LoginInputDTO
      ): Promise<LoginOutputDTO> => {
        const { email, password } = input
    
        const userDB = await this.userDatabase.findUserByEmail(email)
    
        if (!userDB) {
          throw new NotFoundError("'email' não encontrado")
        }
    
        if (password !== userDB.password) {
          throw new BadRequestError("'email' ou 'password' incorretos")
        }
    
        const output: LoginOutputDTO = {
          message: "Login realizado com sucesso",
          token: "token"
        }
    
        return output
      }

    // Fazer o login dps
}