import { TArticleHistory } from "@/lib/types";
import axios from "axios";
import { create } from "zustand";

const { VITE_BACKEND_URI, VITE_BACKEND_HISTORYARTICLE_ENDPOINT } = import.meta
  .env;

type ArticleHistoryStore = {
  loading: boolean;
  error: string | null;
  historyArticles: TArticleHistory[];
  getHistoryArticles: (id: string) => Promise<void>;
  addHistoryArticle: (article: TArticleHistory) => void;
  deleteHistoryArticle: (id: string) => Promise<void>;
  updateHistoryArticle: (id: string, article: Partial<TArticleHistory>) => void;
};

const useArticleHistoryStore = create<ArticleHistoryStore>((set) => ({
  historyArticles: [],
  loading: false,
  error: null,

  getHistoryArticles: async (id) => {
    set(() => ({ loading: true, error: null }));
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) {
        set({
          error: "No token found! Impossible to submit the request!",
          loading: false,
        });
        return;
      }
      const url = `${VITE_BACKEND_URI}${VITE_BACKEND_HISTORYARTICLE_ENDPOINT}/${id}`;
      const response = await axios.get<TArticleHistory[]>(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ historyArticles: await response.data, loading: false });
    } catch (error) {
      set({
        error: "An error occurred while trying to fetch the articles!",
        loading: false,
      });
    }
  },

  updateHistoryArticle: async (id, article) => {
    set(() => ({ loading: true, error: null }));
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) {
        set({
          error: "No token found! Impossible to submit the request!",
          loading: false,
        });
        return;
      }
      const url = `${VITE_BACKEND_URI}${VITE_BACKEND_HISTORYARTICLE_ENDPOINT}/update/${id}`;
      const response = await axios.put<TArticleHistory>(url, article, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        historyArticles: state.historyArticles.map((article) =>
          article.id === id ? response.data : article
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: "An error occurred while trying to update the article!",
        loading: false,
      });
    }
  },

  addHistoryArticle: async (article) => {
    set(() => ({ loading: true, error: null }));
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) {
        set({
          error: "No token found! Impossible to submit the request!",
          loading: false,
        });
        return;
      }
      const url = `${VITE_BACKEND_URI}${VITE_BACKEND_HISTORYARTICLE_ENDPOINT}/save`;
      const response = await axios.post<TArticleHistory>(url, article, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        historyArticles: [...state.historyArticles, response.data],
        loading: false,
      }));
    } catch (error) {
      set({
        error: "An error occurred while trying to save the article!",
        loading: false,
      });
    }
  },
  deleteHistoryArticle: async (id) => {
    set(() => ({ loading: true, error: null }));
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) {
        set({
          error: "No token found! Impossible to submit the request!",
          loading: false,
        });
        return;
      }
      const url = `${VITE_BACKEND_URI}${VITE_BACKEND_HISTORYARTICLE_ENDPOINT}/${id}`;
      await axios.delete<TArticleHistory>(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        historyArticles: state.historyArticles.filter(
          (article) => article.id !== id
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: "An error occurred while trying to delete the article!",
        loading: false,
      });
    }
  },
}));

export default useArticleHistoryStore;
