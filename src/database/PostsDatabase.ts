import { BaseDatabase } from "./BaseDatabase";
import { LikesDislikesDB, PostDB, PostDBWithCreatorName, POST_LIKE } from "../types";
import { UserDatabase } from "./UsersDatabase";
import { LikesDislikes } from "../models/LikesDislikes";
import { ZodVoidDef } from "zod";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"
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

    public async findPostWithCreatorName(id: string): Promise<PostDBWithCreatorName | undefined> {
        const [result] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .select(
        `${PostDatabase.TABLE_POSTS}.id`,
        `${PostDatabase.TABLE_POSTS}.creator_id`,
        `${PostDatabase.TABLE_POSTS}.content`,
        `${PostDatabase.TABLE_POSTS}.likes`,
        `${PostDatabase.TABLE_POSTS}.dislikes`,
        `${PostDatabase.TABLE_POSTS}.created_at`,
        `${PostDatabase.TABLE_POSTS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.name as creator_name`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${PostDatabase.TABLE_POSTS}.creator_id`, 
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      )
      .where({ [`${PostDatabase.TABLE_POSTS}.id`]: id })
    
    return result as PostDBWithCreatorName | undefined
    }

    public findLikeDislike = async (
        likeDislikeDB: LikesDislikesDB
      ): Promise<POST_LIKE | undefined> => {
    
        const [result]: Array<LikesDislikesDB | undefined> = await BaseDatabase
          .connection(PostDatabase.TABLE_LIKES_DISLIKES)
          .select()
          .where({
            user_id: likeDislikeDB.user_id,
            post_id: likeDislikeDB.post_id
          })
    
        if (result === undefined) {
          return undefined
    
        } else if (result.like === 1) {
          return POST_LIKE.ALREADY_LIKED
          
        } else {
          return POST_LIKE.ALREADY_DISLIKED
        }
      }

    public removeLikeDislike = async (likeDislikeDB: LikesDislikesDB): Promise <void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES).del()
        .where({ user_id: likeDislikeDB.user_id, post_id: likeDislikeDB.post_id})
    }

    public updateLikeDislike = async (likeDislikeDB: LikesDislikesDB): Promise <void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES).update(likeDislikeDB)
        .where({ user_id: likeDislikeDB.user_id, post_id: likeDislikeDB.post_id})
    }

    public insertLikeDislike = async (likeDislikeDB: LikesDislikesDB): Promise <void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES).insert(likeDislikeDB)
    }
}