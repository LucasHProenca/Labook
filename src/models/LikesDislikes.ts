export class LikesDislikes {
    constructor(
        private user_id: string,
        private post_id: string,
        private like: number,
       
    ){}

    public getUserId(): string {
        return this.user_id
    }

    public getPostId(): string {
        return this.post_id
    }

    public getLike(): number {
        return this.like
    }

    public setUserId(value: string): void {
        this.user_id = value
    }

    public setPostId(value: string): void {
        this.post_id = value
    }

    public setLike(value: number): void {
        this.like = value
    }
}
