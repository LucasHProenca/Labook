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
import { LikesDislikesDB, PostDB, PostModel, POST_LIKE, USER_ROLES } from "../types"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { ForbiddenError } from "../errors/ForbiddenError"


export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator
    ) { }
    public getPosts = async (input: GetPostInputDTO): Promise<GetPostOutputDTO> => {
        const { q, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("Token inválido")
        }
        const postsModel: PostModel[] = []
        const postsDB = await this.postDatabase.findPosts(q)

        for (let postDB of postsDB) {

            const userIdExists = await this.userDatabase.findUserById(postDB.creator_id)

            if (!userIdExists) {
                throw new BadRequestError("Vídeo com criador não identificado")
            }
            const post = new Posts(
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
        const output: GetPostOutputDTO = postsModel

        return output
    }

    public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
        const { content, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const id = this.idGenerator.generate()

        const postIdExists = await this.postDatabase.findPost(id)

        if (postIdExists) {
            throw new BadRequestError("'id' já existe")
        }

        const post = new Posts(
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.name
        )
        await this.postDatabase.insertPost(post.toPostDB())

        const output: CreatePostOutputDTO = undefined

        return output
    }

    public editPost = async (input: EditPostInputDTO): Promise<EditPostOutputDTO> => {

        const { id, content, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        if (content !== undefined) {
            if (typeof content !== "string") {
                throw new BadRequestError("'content' deve ser do tipo string")
            }
        }

        const postDB = await this.postDatabase.findPost(id)

        if (!postDB) {
            throw new NotFoundError("'post' não encontrado")
        }

        if (payload.id !== postDB.creator_id) {
            throw new ForbiddenError("Somente quem criou o post pode editá-lo")
        }
        const post = new Posts(
            postDB.id, postDB.content, postDB.likes, postDB.dislikes, postDB.created_at, postDB.updated_at, postDB.creator_id, payload.name
        )

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

        const output: EditPostOutputDTO = undefined

        return output
    }

    public deletePosts = async (input: DeletePostInputDTO): Promise<DeletePostOutputDTO> => {
        const { id, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const postExists = await this.postDatabase.findPost(id)

        if (!postExists) {
            throw new NotFoundError("'id' do post não existe")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            if (payload.id !== postExists.creator_id) {
                throw new ForbiddenError("Somente admins e o dono do post podem deleta-lo")
            }
        }
        await this.postDatabase.deletePost(id)


        const output: DeletePostOutputDTO = undefined

        return output
    }

    public likeDislikePost = async (input: PutLikePostInputDTO): Promise<PutLikePostOutputDTO> => {
        const { post_id, token, like } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        if (like !== undefined) {
            if (typeof like !== "boolean") {
                throw new BadRequestError("'like' deve ser do tipo boolean")
            }
        }

        const postDBWithCreatorName = await this.postDatabase.findPostWithCreatorName(post_id)


        if (!postDBWithCreatorName) {
            throw new NotFoundError("'post' não encontrado")
        }

        if (payload.id === postDBWithCreatorName.creator_id) {
            throw new ForbiddenError("Quem criou o post não pode dar like ou dislike")
        }
        const post = new Posts(
            postDBWithCreatorName.id,
            postDBWithCreatorName.content,
            postDBWithCreatorName.likes,
            postDBWithCreatorName.dislikes,
            postDBWithCreatorName.created_at,
            postDBWithCreatorName.updated_at,
            postDBWithCreatorName.creator_id,
            postDBWithCreatorName.creator_name
        )

        const likeSQlite = like ? 1 : 0

        const likesDislikesDB: LikesDislikesDB = {
            user_id: payload.id,
            post_id: post_id,
            like: likeSQlite
        }

        const likeDislikeExists = await this.postDatabase.findLikeDislike(likesDislikesDB)

        if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
            if (like) {
                await this.postDatabase.removeLikeDislike(likesDislikesDB)
                post.removeLike()
            } else {
                await this.postDatabase.updateLikeDislike(likesDislikesDB)
                post.removeLike()
                post.addDislike()
            }
        } else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) {
            if (!like) {
                await this.postDatabase.removeLikeDislike(likesDislikesDB)
                post.removeDislike()
            } else {
                await this.postDatabase.updateLikeDislike(likesDislikesDB)
                post.removeDislike()
                post.addLike()
            }
        } else {
            await this.postDatabase.insertLikeDislike(likesDislikesDB)
            like ? post.addLike() : post.addDislike()
        }

        const updatedPostDB = post.toPostDB()
        await this.postDatabase.updatePost(updatedPostDB)

        const output: PutLikePostOutputDTO = undefined

        return output
    }
}