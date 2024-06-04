export type TArticle = {
    id: string;
    title: string;
    content: string;
    timestamp: number;
    articleHistory: TArticleHistory[];
}

export type TArticleHistory = {
    id: string;
    articleId: string;
    title: string;
    content: string;
    timestamp: number;
}

export type TUser = {
    id: string,
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string,
    role: string[],
    address: {
        street: string,
        city: string,
        houseNumber: string
    }
}