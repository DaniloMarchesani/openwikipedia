import {create} from 'zustand';
import { TArticle } from '@/lib/types';
import axios from 'axios';

const { VITE_BACKEND_URI, VITE_BACKEND_ARTICLE_ENDPOINT } = import.meta.env;


type ArticleStore = {
    loading: boolean;
    error: string | null;
    articles: TArticle[];
    getArticles: () => Promise<void>;
    addArticle: (article: TArticle) => void;
    deleteArticle: (id: string) => Promise<void>;
    updateArticle: (id: string, article: Partial<TArticle>) => void;
    deleteSearchedArticles: () => void;
    

}


const useArticleStore = create<ArticleStore>((set) => ({
    articles: [],
    loading: false,
    error: null,

    getArticles: async () => {
        set(() => ({ loading: true, error: null }));
        try {
            const response = await axios.get<TArticle[]>(`${VITE_BACKEND_URI}${VITE_BACKEND_ARTICLE_ENDPOINT}/all`, { 
                headers: { "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}` } 
            });
            set({ articles: await response.data, loading: false });
        } catch (error) {
            set({ error: "An error occurred while trying to fetch the articles!", loading: false });
        }
    },
    updateArticle: async (id, article) => {
        set(() => ({ loading: true, error: null }));
        //send article to the backend
        try {
            const token = localStorage.getItem("ACCESS_TOKEN");
            if (!token) {
                set({ error: "No token found! Impossible to submit the request!", loading: false });
                return;
            }
            
            const response = await axios.put<TArticle>(`${VITE_BACKEND_URI}${VITE_BACKEND_ARTICLE_ENDPOINT}/update/${id}`, article, {
                headers: { "Authorization": `Bearer ${token}`}
            });
            console.log("user id of the article " + article.userId);
            set((state) => ({ articles: state.articles.map( article => article.id === id ? response.data : article), loading: false }));
        } catch (error) {
            set({ error: "An error occurred while trying to update the article!", loading: false });
        }

    },
    addArticle: async (article) => {
        //set((state) => ({ articles: [...state.articles, article] }))
        set(() => ({ loading: true, error: null }));
        try {
            //send article to the backend
            const response = await axios.post<TArticle>(`${VITE_BACKEND_URI}${VITE_BACKEND_ARTICLE_ENDPOINT}/save`, article, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`}
            });
            set((state) => ({ articles: [...state.articles, response.data], loading: false }));
        } catch (error) {
            set({ error: "An error occurred while trying to save the article!", loading: false});
        }
    },

    deleteSearchedArticles: () => set(() => ({ articles: [] })),

    deleteArticle: async (id) => { 
        set(() => ({ loading: true, error: null }));
        try {
            //send article to the backend
            await axios.delete<TArticle>(`${VITE_BACKEND_URI}${VITE_BACKEND_ARTICLE_ENDPOINT}/${id}`, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`}
            });
            set((state) => ({ articles: state.articles.filter( article => article.id !== id), loading: false }));
        } catch (error) {
            set({ error: "An error occurred while trying to delete the article!", loading: false });
        }
    }
}));

export default useArticleStore;
