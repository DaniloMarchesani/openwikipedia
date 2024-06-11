import { Button } from "@/components/ui/button";
import { IWikipediaArticle } from "@/lib/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

const { VITE_WIKI_ACCESS_TOKEN } = import.meta.env;

interface IData {
    pages: IWikipediaArticle[];
}

const ArticleSpec = () => {
  const [page, setPage] = useState<IData | null >(null);

  const getContent = async () => {
    const api = "https://api.wikimedia.org/core/v1/wikipedia/en/search/page";
    const searchQuery = "solar system";
    const numberOfResults = 1;
    const params = { q: searchQuery, limit: numberOfResults };

    const resp = await axios.get(api, {
      /* headers: {
        Authorization: "Bearer " + VITE_WIKI_ACCESS_TOKEN,
      }, */
      params: params,
    });

    const data = await resp.data;
    setPage(data);
  };


  useEffect(() => {
    page?.pages.map((page) => {
        console.log(page.title);
        console.log(page.excerpt);

    });
  }, [page]);


  return (
    <div>
      <h1>ArticleSpec</h1>
      <div>
        
      </div>
      <Button onClick={getContent}>See page</Button>
    </div>
  );
};

export default ArticleSpec;
