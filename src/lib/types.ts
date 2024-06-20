export type TArticle = {
    id?: string;
    title: string;
    userId?: string;
    content: string;
    createdAt?: number;
    articleHistory?: TArticleHistory[];
}

export type TArticleHistory = {
    id?: string;
    articleId: string;
    title: string;
    content: string;
    modifiedAt?: number;
}

export type TUser = {
    id: string,
    token: string,
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string,
    role: string[],
    address?: {
        street: string,
        city: string,
        houseNumber: string
    }
}