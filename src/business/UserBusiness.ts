import { UserDatabase } from "../database/UsersDatabase"
import { LoginInputDTO, LoginOutputDTO } from "../dtos/userLogin.dto"
import { UserSignupInputDTO, UserSignupOutputDTO } from "../dtos/userSignup.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Users } from "../models/Users"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager, TokenPayload } from "../services/TokenManager"
import { UserDB, USER_ROLES } from "../types"

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) { }
  public userSignUp = async (input: UserSignupInputDTO): Promise<UserSignupOutputDTO> => {
    const { name, email, password, } = input

    const id = this.idGenerator.generate()

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
      USER_ROLES.NORMAL,
      new Date().toISOString()
    )

    const tokenPayload: TokenPayload = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole()
  }

  const token = this.tokenManager.createToken(tokenPayload)

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
      token: token
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

    const user = new Users(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    )

    // modelagem do payload do token
    const tokenPayload: TokenPayload = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole()
    }

    // criação do token
    const token = this.tokenManager.createToken(tokenPayload)

    const output: LoginOutputDTO = {
      token: token
    }

    return output
  }

  // Fazer o login dps
}