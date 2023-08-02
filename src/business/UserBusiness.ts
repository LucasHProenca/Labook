import { UserDatabase } from "../database/UsersDatabase"
import { UserSignupInputDTO, UserSignupOutputDTO } from "../dtos/userSignup.dto"
import { BadRequestError } from "../errors/BadRequestError"
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

    public userLogin = async (input:any) => {
        
    }

    // Fazer o login dps


}