export class Posts {
    constructor(
        private id: string,
        private creator: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string,
    ){}

    public getId(): string {
        return this.id
    }

    public getCreatorId(): string {
        return this.creator
    }

    public getContent(): string {
        return this.content
    }

    public getLikes(): number {
        return this.likes
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public getUpdatedAt(): string {
        return this.updatedAt
    }

    public setId(value: string): void {
        this.id = value
    }

    public setCreatorId(value: string): void {
        this.creator = value
    }

    public setContent(value: string): void {
        this.content = value
    }

    public setLikes(value: number): void {
        this.likes = value
    }

    public setDislkes(value: number): void {
        this.dislikes = value
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public setUpdatedAt(value: string): void {
        this.updatedAt = value
    }
}