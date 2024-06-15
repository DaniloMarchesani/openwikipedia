export interface INotify {
    message: string,
    options?: {
        type: "success" | "error" | "info" | "warning",
        autoClose: number
    }
}

export interface ISearchedArticleJson {
    pages: IWikipediaArticle[];
}

export interface IWikipediaArticle {
    id: number;
    title: string;
    excerpt: string;
    key: string;
    description: string;
    matched_title: null | string;
    thumbnail: {
        duration: number;
        height: number;
        width: number;
        mimetype: string;
        url: string;
    }

}

export interface IArticleStructure {
    tag: string;
    content: string | null;
  }