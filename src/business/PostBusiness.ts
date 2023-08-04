import { PostDatabase } from "../database/PostsDatabase"
import { UserDatabase } from "../database/UsersDatabase"
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/createPost.dto"
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/deletePost.dto"
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/editPost.dto"
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/getPost.dto"
import { PutLikePostInputDTO, PutLikePostOutputDTO } from "../dtos/putLikePost.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Posts } from "../models/Posts"
import { PostDB, PostModel } from "../types"

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase
    ) { }
    public getPosts = async (input: GetPostInputDTO): Promise<GetPostOutputDTO> => {
        const { q } = input

        const postsModel: PostModel[] = []

        const postsDB = await this.postDatabase.findPosts(q)

        //Tem que arrumar a estrutura pra ficar igual ao que é esperado, busca pelo id funciona só pelo q?=
        for (let postDB of postsDB) {

            const userIdExists = await this.userDatabase.findUserById(postDB.creator_id)

            if(!userIdExists) {
                throw new BadRequestError("Vídeo com criador não identificado")
            }
            const post =  new Posts(
                postDB.id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at,
                postDB.creator_id,
                userIdExists.name
            )

            postsModel.push(post.toPostModel())
        }
          

        // const output: GetPostOutputDTO[] = posts.map(post => ({
        //     id: post.getId(),
        //     content: post.getContent(),
        //     likes: post.getLikes(),
        //     dislikes: post.getDislikes(),
        //     created_at: post.getCreatedAt(),
        //     updated_at: post.getUpdatedAt(),
        //     creator: {
        //         creator_id: post.getCreatorId(),
        //     }
        // }))

        const output: GetPostOutputDTO = postsModel

        return output
    }

    public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
        const { id, creator_id, content} = input

        const postIdExists = await this.postDatabase.findPost(id)
        
        const userIdExists = await this.userDatabase.findUserById(creator_id)

        if (postIdExists) {
            throw new BadRequestError("'id' já existe")
        }

        if (!userIdExists) {
            throw new NotFoundError("'creator' não existe, faça login para postar")
        }

        const post = new Posts(
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            creator_id,
            userIdExists.name
        )

        // const newPost: PostDB = {
        //     id: post.getId(),
        //     creator_id: post.getCreatorId(),
        //     content: post.getContent(),
        //     likes: post.getLikes(),
        //     dislikes: post.getDislikes(),
        //     created_at: post.getCreatedAt(),
        //     updated_at: post.getUpdatedAt()
        // }

        await this.postDatabase.insertPost(post.toPostDB())

        const output: CreatePostOutputDTO = {
            message: "Post criado com sucesso"
        }

        return output
    }

    public editPost = async (input: EditPostInputDTO): Promise<EditPostOutputDTO> => {

        const { id, content } = input

        if (content !== undefined) {
            if (typeof content !== "string") {
                throw new BadRequestError("'content' deve ser do tipo string")
            }
        }

        const postDB = await this.postDatabase.findPost(id)
        

        if (!postDB) {
            throw new NotFoundError("'post' não encontrado")
        }
        const userIdExists = await this.userDatabase.findUserById(postDB.creator_id)

        if(!userIdExists) {
            throw new BadRequestError("Vídeo com criador não identificado")
        }
        const post =  new Posts(
            postDB.id, postDB.content, postDB.likes, postDB.dislikes, postDB.created_at, postDB.updated_at, postDB.creator_id, userIdExists.name
        )

        id && post.setId(id)
        content && post.setContent(content)
        post.setUpdatedAt(new Date().toISOString())

        const postEdited: PostDB = {
            id: post.getId(),
            creator_id: post.getCreatorId(),
            content: post.getContent(),
            likes: post.getLikes(),
            dislikes: post.getDislikes(),
            created_at: post.getCreatedAt(),
            updated_at: post.getUpdatedAt()
        }

        await this.postDatabase.updatePost(postEdited)

        const output: EditPostOutputDTO = {
            message: "Post atualizado com sucesso"
        }

        return output

        // if(postDB) {
        //     const post = new Posts
        //     (postDB.id, postDB.creator_id, postDB.content, postDB.likes, postDB.dislikes, postDB.created_at, postDB.updated_at)
        //     if(content) {
        //         post.setContent(content)
        //     }
        //     const postEdited: PostDB = {
        //         id: post.getId(),
        //         creator_id: post.getCreatorId(),
        //         content: post.getContent(),
        //         likes: post.getLikes(),
        //         dislikes: post.getDislikes(),
        //         created_at: post.getCreatedAt(),
        //         updated_at: post.getUpdatedAt()
        //     }
        //     await this.postDatabase.updatePost(postEdited)

        //     const output: EditPostOutputDTO = {
        //         message: "Post atualizado com sucesso"
        //     }

        //     return output
        // }
    }

    public deletePosts = async (input: DeletePostInputDTO): Promise<DeletePostOutputDTO> => {
        const { id } = input

        const postExists = await this.postDatabase.findPost(id)

        if (postExists) {
            await this.postDatabase.deletePost(id)
        } else {
            // res.status(404)
            throw new NotFoundError("'id' do post não existe")
        }

        const output: DeletePostOutputDTO = {
            message: "Post apagado com sucesso"
        }

        return output
    }

    public likeDislikePost = async (input: PutLikePostInputDTO): Promise <PutLikePostOutputDTO> => {
        const { post_id, like } = input

        if (like !== undefined) {
            if (typeof like !== "boolean") {
                throw new BadRequestError("'like' deve ser do tipo boolean")
            }
        }

        const postDB = await this.postDatabase.findPost(post_id)
        

        if (!postDB) {
            throw new NotFoundError("'post' não encontrado")
        }
        const userIdExists = await this.userDatabase.findUserById(postDB.creator_id)

        if(!userIdExists) {
            throw new BadRequestError("Vídeo com criador não identificado")
        }
        const post =  new Posts(
            postDB.id, postDB.content, postDB.likes, postDB.dislikes, postDB.created_at, postDB.updated_at, postDB.creator_id, userIdExists.id
        )

        let likes = post.getLikes()

        if(like) {
            likes += 1
        } else {
            likes -= 1
        }

        post_id && post.setId(post_id)
        // like && post.setLikes(like)
        post.setUpdatedAt(new Date().toISOString())

        const postEdited: PostDB = {
            id: post.getId(),
            creator_id: post.getCreatorId(),
            content: post.getContent(),
            likes: post.getLikes(),
            dislikes: post.getDislikes(),
            created_at: post.getCreatedAt(),
            updated_at: post.getUpdatedAt()
        }

        await this.postDatabase.updatePost(postEdited)

        const output: EditPostOutputDTO = {
            message: "Post atualizado com sucesso"
        }

        return output
    }
}