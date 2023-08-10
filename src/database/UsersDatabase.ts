import { BaseDatabase } from "./BaseDatabase";
import { UserDB } from "../types";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"
    public async signUp(userDB: UserDB): Promise<void> {
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(userDB)
    }

    public async findUserById(id: string): Promise<UserDB | undefined> {
        const [userDBExists]: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({ id })
        return userDBExists
    }

    public async findUserByEmail(email: string): Promise<UserDB | undefined> {
        const [userDBExists]: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({ email })
        return userDBExists
    }

    public async login(email: string, password: string): Promise<UserDB | undefined> {
        const [userDBExists]: UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS).where({ email, password })
        return userDBExists
    }

    public async findUsers(): Promise<UserDB[]> {
        let result: UserDB[] = []

        result = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
        return result
    }

    public async updateUser(userDB: UserDB): Promise<void> {
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).update(userDB).where({ id: userDB.id })
    }

    public async deleteUser(id: string): Promise<void> {
        await BaseDatabase.connection(UserDatabase.TABLE_USERS).del().where({ id })
    }
}