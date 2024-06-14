
import useArticleStore from "@/context/ArticleStore";
import { useEffect, useState } from "react";

import ArticleFolderArea from "@/components/dashboard/ArticleFolderArea";
import DailyArticleBanner from "@/components/dashboard/DailyArticleBanner";

const Dashboard = () => {

  const [loaded, setLoaded] = useState<boolean>(false);
  
  const { articles, getArticles} = useArticleStore();

  useEffect(() => {

    if(!loaded){
      getArticles();
      setLoaded(true);
    }
    
    console.log(articles);
  }, [loaded, articles]);

  return (
    <div className="w-full flex flex-col items-center justify-between">
        <DailyArticleBanner />
        <ArticleFolderArea articles={articles}/>

    </div>
  );
};

export default Dashboard;
