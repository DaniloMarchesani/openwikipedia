
import useArticleStore from "@/context/ArticleStore";
import { useEffect, useState } from "react";

import ArticleFolderArea from "@/components/dashboard/ArticleFolderArea";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Flame, Rocket } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {

  const [loaded, setLoaded] = useState<boolean>(false);
  const { user } = useAuth();
  
  const { articles, getArticles} = useArticleStore();

  useEffect(() => {

    if(!loaded){
      getArticles();
      setLoaded(true);
    }
    
  }, [loaded, articles]);

  return (
    <div className="w-full flex flex-col items-center justify-between">
        <div className="w-[90%] flex items-center justify-center flex-col bg-[#8338EC]/30 dark:bg-[#8338EC]/30 p-10 rounded-3xl my-10 gap-2">
          <h1 className=" text-3xl font-semibold flex items-center justify-center"><Flame className="mr-2" />Welcome to your Dashboard {user?.username}!</h1>
          <p className="text-md ">Here you can see all your articles and manage them.</p>
          <p className="text-sm ">Let's see where your curiosity will take you today. 😎</p>
          <Button asChild className="mt-4 gradient-bg animate-gradient"><Link to={"./advanced-search"}><Rocket className="h-4 w-4 mr-2"/>Advanced Search</Link></Button>
        </div>
        <ArticleFolderArea articles={articles}/>
    </div>
  );
};

export default Dashboard;
