import { BaseDatabase } from "./BaseDatabase";
import { UserDB } from "../types";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"
    public async signUp(userDB: UserDB): Promise<void> {
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(userDB)
    }

    public async findUserById(id: string): Promise<UserDB | undefined> {
        const [userDBExists]: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({id})
        return userDBExists
    }

    public async findUserByEmail(email: string): Promise<UserDB | undefined> {
        const [userDBExists]: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({email})
        return userDBExists
    }

    public async login(email: string, password: string): Promise<UserDB | undefined> {
        const [userDBExists]: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({email, password})
        return userDBExists
    } 
    // aqui tem o login
}