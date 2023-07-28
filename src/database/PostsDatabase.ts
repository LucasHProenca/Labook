import { BaseDatabase } from "./BaseDatabase";
import { PostDB } from "../types";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public async findPosts(q?: string): Promise<PostDB[]> {
        let result: PostDB[] = []

        if(q){
            result = await BaseDatabase.connection(PostDatabase.TABLE_POSTS).where("id", "LIKE", `%${q}%`)
        }else {
            result = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        }
        return result
    }

    public async findPost(id: string): Promise<PostDB | undefined> {
        const [postDBExists]: PostDB[] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS).where({id})
        return postDBExists
    }

    public async insertPost(postDB: PostDB): Promise<void> {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(postDB)
    }

    public async updatePost(postDB: PostDB): Promise<void> {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS).update(postDB).where({id: postDB.id})
    }

    public async deletePost(id: string): Promise<void> {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS).del().where({id})
    }
}