import { PostDatabase } from "../database/PostsDatabase"
import { UserDatabase } from "../database/UsersDatabase"
import { Posts } from "../models/Posts"
import { PostDB } from "../types"

export class PostBusiness {
    public getPosts = async (input: any) => {
        const { q } = input

        const postDatabase = new PostDatabase()

        const postsDB = await postDatabase.findPosts(q)

        //Tem que arrumar a estrutura pra ficar igual ao que é esperado, busca pelo id funciona só pelo q?=
        const posts = postsDB.map((postDB) => {
            return new Posts(
                postDB.id,
                postDB.creator_id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at
            )
        })

        return posts
    }

    public createPost = async (input: any) => {
        const { id, creator_id, content, likes, dislikes } = input

        if (typeof id !== "string") {
            // res.status(400) verificar todos os erros dps
            throw new Error("'id' deve ser string")
        }

        if (typeof creator_id !== "string") {
            // res.status(400)
            throw new Error("'creator' deve ser string")
        }

        if (typeof content !== "string") {
            // res.status(400)
            throw new Error("'content' deve ser string")
        }

        if (typeof likes !== "number") {
            // res.status(400)
            throw new Error("'likes' deve ser number")
        }

        if (typeof dislikes !== "number") {
            // res.status(400)
            throw new Error("'dislikes' deve ser number")
        }

        const postDatabase = new PostDatabase()
        const postIdExists = await postDatabase.findPost(id)
        const userDatabase = new UserDatabase()
        const userIdExists = await userDatabase.findUserById(creator_id)

        if (postIdExists) {
            // res.status(400)
            throw new Error("'id' já existe")
        }

        if (!userIdExists) {
            // res.status(400)
            throw new Error("'creator' não existe, faça login para postar")
        }

        const post = new Posts(
            id,
            creator_id,
            content,
            likes,
            dislikes,
            new Date().toISOString(),
            new Date().toISOString()
        )

        const newPost: PostDB = {
            id: post.getId(),
            creator_id: post.getCreatorId(),
            content: post.getContent(),
            likes: post.getLikes(),
            dislikes: post.getDislikes(),
            created_at: post.getCreatedAt(),
            updated_at: post.getUpdatedAt()
        }

        await postDatabase.insertPost(newPost)

        const output = {
            message: "Post criado com sucesso"
        }

        return output
    }

    public editPost = async (input: any) => {
        
        const {id, newContent} = input

        if(newContent !== undefined) {
            if(typeof newContent !== "string") {
                // res.statusCode = (400)
                throw new Error("'content' deve ser do tipo string")
            }
        }

            const postDatabase = new PostDatabase()
            const postDB = await postDatabase.findPost(id)

            if(!postDB) {
                // res.status(400)
                throw new Error ("'post' não encontrado")
            }

            if(postDB) {
                const post = new Posts
                (postDB.id, postDB.creator_id, postDB.content, postDB.likes, postDB.dislikes, postDB.created_at, postDB.updated_at)
                if(newContent) {
                    post.setContent(newContent)
                }
                const postEdited: PostDB = {
                    id: post.getId(),
                    creator_id: post.getCreatorId(),
                    content: post.getContent(),
                    likes: post.getLikes(),
                    dislikes: post.getDislikes(),
                    created_at: post.getCreatedAt(),
                    updated_at: post.getUpdatedAt()
                }
                await postDatabase.updatePost(postEdited)

                const output = {
                    message: "Post atualizado com sucesso"
                }

                return output
            }
    }

    public deletePosts = async (input: any) => {
        const {id} = input

        const postDatabase = new PostDatabase()
        const postExists = await postDatabase.findPost(id)

        if (postExists) {
            await postDatabase.deletePost(id)
        } else {
            // res.status(404)
            throw new Error("'id' do post não existe")
        }

        const output = {
            message: "Post apagado com sucesso"
        }

        return output
    }
}