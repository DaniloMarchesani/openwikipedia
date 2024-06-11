import { useEffect, useState, KeyboardEvent } from "react";
import { Input } from "../ui/input";
import debounce from "debounce";
import axios from "axios";
import { set } from "react-hook-form";
import useArticleStore from "@/context/ArticleStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { ISearchedArticleJson } from "@/lib/interfaces";
import ArticleItemCard from "./ArticleItemCard";
import { ArrowBigDown } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const { VITE_WIKI_QUICK_SEARCH_URL } = import.meta.env;

const QuickSearchBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchedValue, setSearchedValue] = useState<string>("");
  const [articlesFound, setArticlesFound] = useState<ISearchedArticleJson | null >(null);


  const handleSearch = async (e: KeyboardEvent<HTMLInputElement>) => {
    try {
      if (e.key !== "Enter") return;
      const trimVal = searchedValue.trim().toLowerCase();
      const api = `${VITE_WIKI_QUICK_SEARCH_URL}`;
      const params = {
        "q": trimVal,
        "limit": 10
      }

      const resp = await axios.get(api, { params: params});
      console.log(await resp.data)
      setArticlesFound(null);
      setArticlesFound(resp.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchedValue.length === 0) {
      setOpen(false);
    }
  }, [searchedValue]);

  return (
    <div className="relative w-full flex items-center justify-center ">
      <Input
        placeholder="Quick fire search...🔥"
        onChange={debounce((e) => {
          setSearchedValue(e.target.value);
          e.target.value.length > 0 ? setOpen(true) : setOpen(false);
        }, 300)}
        className="w-[calc(100%/4)] rounded-full text-center"
        onKeyDown={(e) => handleSearch(e)}
      />
      { open && <div className="bg-white w-[calc(100%/2)] max-h-[calc(100vh/2)] absolute top-10 rounded-xl left-1/2 -translate-x-1/2 mt-1 border overflow-y-scroll">
      {/* Searched artcles here! */}
      { articlesFound && articlesFound.pages.map((article) => {
        return (
          <Link to={"./article/" + article.title} key={article.id}>
              <ArticleItemCard article={article}/>
          </Link>
        );
      })}
      </div>}
    </div>
  );
};

export default QuickSearchBar;
