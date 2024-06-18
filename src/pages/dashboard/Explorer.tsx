import ArticleTable from "@/components/dashboard/ArticleTable";
import { Button } from "@/components/ui/button";
import useArticleStore from "@/context/ArticleStore";
import { TArticle } from "@/lib/types";
import { Rocket, Telescope } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Explorer = () => {

    const { state } = useLocation();
    const [fetchedArticles, setFetchedArticles] = useState<TArticle[] | null>(null);
    const { articles, getArticles, deleteArticle, loading } = useArticleStore();

    const handleDelete = (id: string) => {
        console.log(`Article deleted: ${id}`);
        deleteArticle(id);
    }

    useEffect(() => {
        console.log(`state: ${state}`)
        if(!state && !fetchedArticles){
            console.log("fetching articles");
           getArticles();
           setFetchedArticles(articles);
           console.log(articles);
        } else {
            setFetchedArticles(state);
        }   
    }, [state, articles])


    return (
        <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent gradient-text animate-gradient mb-6">Article Explorer</h1>
            <h2 className="text-lg mb-4 flex items-center justify-center bg-[#fb5607]/30 p-2 rounded-2xl"><Telescope className="mr-2" />Explore all your saved resources here</h2>
            <ArticleTable articles={articles} handleDelete={handleDelete} loading={loading}/>
            <Button className="gradient-bg animate-gradient"><Rocket className="w-4 h-4 mr-2"/><Link to={"/dashboard/advanced-search"}>Start a new Search</Link></Button>
        </div>
    )
}

export default Explorer; 