import { UserDatabase } from "../database/UsersDatabase"
import { DeleteUserInputDTO, DeleteUserOutputDTO } from "../dtos/deleteUser.dto"
import { EditUserInputDTO, EditUserOutputDTO } from "../dtos/editUser.dto"
import { GetUserInputDTO, GetUserOutputDTO } from "../dtos/getUser.dto"
import { LoginInputDTO, LoginOutputDTO } from "../dtos/userLogin.dto"
import { UserSignupInputDTO, UserSignupOutputDTO } from "../dtos/userSignup.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { ForbiddenError } from "../errors/ForbiddenError"
import { NotFoundError } from "../errors/NotFoundError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { Users } from "../models/Users"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager, TokenPayload } from "../services/TokenManager"
import { UserDB, UserModel, USER_ROLES } from "../types"

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) { }
  public userSignUp = async (input: UserSignupInputDTO): Promise<UserSignupOutputDTO> => {
    const { name, email, password, } = input

    const id = this.idGenerator.generate()

    const userDBExists = await this.userDatabase.findUserByEmail(email)
    const userDBIdExists = await this.userDatabase.findUserById(id)

    const hashedPassword = await this.hashManager.hash(password)

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
      hashedPassword,
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

    const hashedPassword = userDB.password

    const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)

    if (!isPasswordCorrect) {
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

    const tokenPayload: TokenPayload = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole()
    }

    const token = this.tokenManager.createToken(tokenPayload)

    const output: LoginOutputDTO = {
      token: token
    }

    return output
  }

  public getUsers = async (input: GetUserInputDTO): Promise<GetUserOutputDTO> => {
    const { token } = input

    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new BadRequestError("Token inválido")
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      throw new ForbiddenError("Somente admins podem ter acesso aos usuários")
    }
    const usersModel: UserModel[] = []
    const usersDB = await this.userDatabase.findUsers()

    for (let userDB of usersDB) {

      const user = new Users(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at
      )

      usersModel.push(user.toUserModel())
    }
    const output: GetUserOutputDTO = usersModel

    return output
  }

  public editUser = async (input: EditUserInputDTO): Promise<EditUserOutputDTO> => {

    const { id, name, email, password, token } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }
    const userDB = await this.userDatabase.findUserById(id)

    if (!userDB) {
      throw new NotFoundError("'user' não encontrado")
    }

    if (payload.id !== userDB.id) {
      throw new ForbiddenError("Somente o dono da conta pode edita-la")
    }
    const user = new Users(
      userDB.id, userDB.name, userDB.email, userDB.password, userDB.role, userDB.created_at
    )

    name && user.setName(name)
    email && user.setEmail(email)
    password && user.setPassword(password)


    const userEdited: UserDB = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
      created_at: user.getCreatedAt(),
    }

    await this.userDatabase.updateUser(userEdited)

    const output: EditUserOutputDTO = undefined

    return output
  }

  public deleteUser = async (input: DeleteUserInputDTO): Promise<DeleteUserOutputDTO> => {
    const { id, token } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const userIdExists = await this.userDatabase.findUserById(id)

    if (!userIdExists) {
      throw new NotFoundError("'id' do usuário não existe")
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      if (payload.id !== userIdExists.id) {
        throw new ForbiddenError("Somente admins e o dono da conta podem deleta-la")
      }
    }
    await this.userDatabase.deleteUser(id)


    const output: DeleteUserOutputDTO = undefined

    return output
  }

}