import { create } from "zustand";
import { TArticle, TUser, TArticleHistory } from "@/lib/types";
import axios from "axios";


const useUserStore = create((set) => ({
    user: null,
}));