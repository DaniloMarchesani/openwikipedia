import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion as m } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { IWikipediaArticle } from "@/lib/interfaces";
import { Link } from "react-router-dom";
import Spinner from "@/components/common/Spinner";

const AdvancedSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("en");
  const [resultsCount, setResultsCount] = useState(10);
  const [isError, setIsError] = useState<Error | null | AxiosError>(null);
  const [resultArticles, setResultArticles] = useState<IWikipediaArticle[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    // Logica per inviare la richiesta di ricerca
    console.log(`Search term: ${searchTerm}`);
    console.log(`Language: ${language}`);
    console.log(`Results count: ${resultsCount}`);

    const baseUrl = "https://api.wikimedia.org/core/v1/wikipedia/";
    const endpoint = "/search/page";
    const url = `${baseUrl}${language}${endpoint}`;
    const params = {
        q: searchTerm,
        limit: resultsCount,
        };
    try {
      setLoading(true);
      setResultArticles(null);
        const response = await axios.get(url, { params });
        console.log(response.data.pages);
        setResultArticles(response.data.pages);
    }catch (error) {
        setIsError(error as AxiosError | Error);
        console.error(error);
    } finally {
        setLoading(false);
    }
    
  };
  
  const handleCountChange = (value: string) => {
    setResultsCount(parseInt(value));
  }

  

  return (
    <AnimatePresence>
        <div className="w-full">
            <m.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 1 }} 
                className="w-full flex flex-col items-center">
              <h1 className="text-4xl font-bold mb-8 gradient-text text-transparent animate-gradient">Advanced Search Page</h1>
              <div className="flex flex-nowrap items-center gap-1 p-1 gradient-bg rounded-lg shadow animate-gradient w-1/2">
                <Input placeholder="Search term" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} className="focus:outline-none"/>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a lang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup> 
                      <SelectLabel>Languages</SelectLabel>
                      <SelectItem defaultChecked value="en">🇬🇧 English</SelectItem>
                      <SelectItem value="de">🇩🇪 German</SelectItem>
                      <SelectItem value="fr">🇫🇷 French</SelectItem>
                      <SelectItem value="it">🇮🇹 Italian</SelectItem>
                      <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
        
                {/* Select for choose the limit of articles to fetch */}
                <Select value={resultsCount.toString()} onValueChange={handleCountChange}>
                  <SelectTrigger className="w-max">
                    <SelectValue placeholder="Limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>number of articles</SelectLabel>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button onClick={handleSearch}>Search</Button>
              </div>
            </m.div>

            <div className="flex flex-col justify-center items-center">
                { isError && <p className="text-red-500">An error occurred: {isError.message}</p> }
                { resultArticles && resultArticles.length === 0 && <p className="text-center mt-8">No results found</p>}
                { loading && <div className="mt-8 text-2xl flex justify-center items-center">Searching...<Spinner /></div>}
                { resultArticles && resultArticles.length > 0 && <div className="max-w-xl min-w-sm flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold mt-8">Results</h2>
                    <ul>
                        {resultArticles.map((article, index) => (
                            <li key={index} className="text-center md:text-left bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 p-4 rounded-xl mb-4">
                                <Link to={"/dashboard/article/" + article.key} state={{ article: article, language: language}}>
                                    <h3 className="text-xl font-bold">{article.title}</h3>
                                    <p>{article.description}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    </div>}
            </div>
        </div>
    </AnimatePresence>
  );
};

export default AdvancedSearchPage;
