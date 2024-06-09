
import { useEffect, useState, KeyboardEvent } from "react";
import { Input } from "../ui/input";
import debounce from 'debounce';
import axios from "axios";
import { set } from "react-hook-form";
import useArticleStore from "@/context/ArticleStore";


const { VITE_WIKIPEDIA_API_URI, VITE_ACCESS_TOKEN } = import.meta.env;
  
  const SearchBar = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [result, setResult ] = useState({});
    const [ searchedValue, setSearchedValue ] = useState<string>("");

    const addArticle = useArticleStore(state => state.addArticle);
    const deleteSearchedArticles = useArticleStore(state => state.deleteSearchedArticles);

    

    const handleSearch = async (e: KeyboardEvent<HTMLInputElement>) => {
        try {
            if(e.key !== "Enter") return;
            const trimVal = searchedValue.trim().toLowerCase();
            const api = `${VITE_WIKIPEDIA_API_URI}${trimVal}`;

            const resp = await axios.get(api);

            //let articlesFoundObjs = await resp.data.query.search; 
            let articlesFoundObjs = {...resp.data};
            let manyArticles = articlesFoundObjs.query.search;
            deleteSearchedArticles();
            Object.keys(manyArticles).map(key => addArticle(manyArticles[key]))
        } catch (error) {
            console.log("ERORE DIO " + error);
        }
    }


    return (
      <>
        <Input placeholder="Search..." onChange={debounce(e => setSearchedValue(e.target.value), 300)} className="max-w-lg" onKeyDown={e => handleSearch(e)}/>
      </>
    )
  }

  export default SearchBar;