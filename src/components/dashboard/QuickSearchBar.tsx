import { useEffect, useState, KeyboardEvent } from "react";
import { Input } from "../ui/input";
import debounce from "debounce";
import axios from "axios";
import { ISearchedArticleJson } from "@/lib/interfaces";
import ArticleItemCard from "./ArticleItemCard";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";


const { VITE_WIKI_QUICK_SEARCH_URL } = import.meta.env;

const QuickSearchBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchedValue, setSearchedValue] = useState<string>("");
  const [articlesFound, setArticlesFound] = useState<ISearchedArticleJson | null >(null);



  const handleSearch = async (e: KeyboardEvent<HTMLInputElement>) => {
    try {
      //if (e.key !== "Enter") return;
      const trimVal = searchedValue.trim().toLowerCase();
      const api = `${VITE_WIKI_QUICK_SEARCH_URL}`;
      const params = {
        "q": trimVal,
        "limit": 10
      }

      if (params.q.length === 0) return setArticlesFound(null);

      const resp = await axios.get(api, { params: params});
      setArticlesFound(null);
      setLoading(false);
      setArticlesFound(resp.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  /* useEffect(() => {
    if (searchedValue.length === 0) {
      setOpen(false);
      setArticlesFound(null);
    }
  }, [searchedValue]); */

  return (
    <div className="relative w-full flex items-center justify-center ">
      <Input
        placeholder="Quick fire search...🔥"
        onChange={debounce((e) => {
          e.target.value.length > 0 ? setOpen(true) : setOpen(false);
          setSearchedValue(e.target.value);
          handleSearch(e);
        }, 300)}
        className="w-[calc(100%/4)] rounded-full text-center"
        onKeyDown={(e) => e.key === "Enter" ? handleSearch(e) : null}
      />
      { open && <div className="bg-white w-[calc(100%/2)] max-h-[calc(100vh/2)] absolute top-10 rounded-xl left-1/2 -translate-x-1/2 mt-1 border overflow-y-scroll">
      {/* Searched artcles here! */}
        {loading && <Spinner/>}
      { articlesFound && articlesFound.pages.map((article) => {
        return (
          <Link to={"./article/" + article.title} key={article.id} onClick={() => {
            setOpen(!open)
            setLoading(!loading);
            setSearchedValue("");
            }}>
              <ArticleItemCard article={article}/>
          </Link>
        );
      })}
      </div>}
    </div>
  );
};

export default QuickSearchBar;
