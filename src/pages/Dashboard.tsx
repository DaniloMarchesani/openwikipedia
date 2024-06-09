import SearchBar from "@/components/dashboard/SearchBar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useArticleStore from "@/context/ArticleStore";
import { useEffect } from "react";
import { title } from "process";
import { Link } from "react-router-dom";

const { VITE_ACCESS_TOKEN, VITE_CLIENT_ID } = import.meta.env;

const Dashboard = () => {
  const getDailyArticle = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${year}/${month}/${day}`;

    try {
        console.log("access token: " + VITE_ACCESS_TOKEN);
        const resp = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${VITE_ACCESS_TOKEN}`,
            }
        });
        const data = await resp.json();
        console.log(data);
    } catch (error) {
        console.log("ERROR: " + error);
    }
  };

  const { articles } = useArticleStore();

  const getArticles = async (articleId) => {
    try{
        const api = "http://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=" + articleId + "&inprop=url"
        const resp = await axios.get(api);
        console.log("ARTICOLOOOO " + resp.data);
    }
    catch(error) {
      console.log("ERROR: " + error);
    }
  }

  useEffect(() => {
    console.log(articles.length)
  },[articles])

  return (
    <div className="w-full flex flex-col items-center justify-between">
      <h1>Dashboard</h1>
      <SearchBar />
      
      <div>
        {articles.map((article, index) => (
            <div key={index} className="text-left space-y-3">
                <h2 className="font-bold">{article.title}</h2>
                <p>{article.snippet}</p>
                <Link to={"https://en.wikipedia.org/?curid="+article.pageid} className="underline">read more...</Link>
                <Button onClick={() => getArticles(article.pageid)}>search it!</Button>
            </div>
            
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
