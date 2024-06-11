
import useArticleStore from "@/context/ArticleStore";
import { useEffect } from "react";

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
