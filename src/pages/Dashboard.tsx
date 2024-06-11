import SearchBar from "@/components/dashboard/SearchBar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useArticleStore from "@/context/ArticleStore";
import { useEffect } from "react";
import { title } from "process";
import { Link } from "react-router-dom";
import ArticleFolderArea from "@/components/dashboard/ArticleFolderArea";

const Dashboard = () => {
  
  const { articles } = useArticleStore();

  useEffect(() => {
    console.log(articles.length)
  },[articles])

  return (
    <div className="w-full flex flex-col items-center justify-between">
     
        <ArticleFolderArea />

    </div>
  );
};

export default Dashboard;
