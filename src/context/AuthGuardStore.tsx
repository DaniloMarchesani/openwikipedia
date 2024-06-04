
import { TArticle, TUser } from "@/lib/types";
import { create } from "zustand";
import axios from "axios";

interface IStoreContext {
    isAuthenticated: boolean,
    user: TUser | null,
    token: string | null,
    login: (user: TUser) => void,
    logout: () => void
    articles: TArticle[],
    saveArticle: (article: TArticle) => void,
    updateArticle: (article: TArticle) => void,
    deleteArticle: (article: TArticle) => void,

}

const { BACKEND_URI } = import.meta.env;

const api = axios.create({
    baseURL: `${BACKEND_URI}/api`
});

const useAuthGuardStore = create<IStoreContext>((set) => ({
    isAuthenticated: false,
    user: null,
    token: null,
    articles: [],
    login: (user) => set({ isAuthenticated: true, user}),
    logout: () => set({ isAuthenticated: false, user: null }),
    saveArticle: (article) => set((state) => ({ articles: [...state.articles, article] })),
    updateArticle: (article) => set((state) => ({ articles: state.articles.map((a) => a.id === article.id ? article : a) })),
    deleteArticle: (article) => set((state) => ({ articles: state.articles.filter(item => item.id !== article.id) })),
}))


export default useAuthGuardStore;