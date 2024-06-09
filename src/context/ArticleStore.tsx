import {create} from 'zustand';

type Article = {
    id: number;
    title: string;
    content: string;
};

type ArticleStore = {
    articles: Article[];
    addArticle: (article: Article) => void;
    removeArticle: (id: number) => void;
    deleteSearchedArticles: () => void;
};

const useArticleStore = create<ArticleStore>((set) => ({
    articles: [],
    addArticle: (article) => set((state) => ({ articles: [...state.articles, article] })),
    deleteSearchedArticles: () => set((state) => ({ articles: [] })),
    removeArticle: (id) => set((state) => ({ articles: state.articles.filter((article) => article.id !== id) })),
}));

export default useArticleStore;
