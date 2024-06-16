import { Clock8 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import useArticleHistoryStore from "@/context/ArticleHistoryStore";
import { Skeleton } from "../ui/skeleton";


const ArticleHistorySelector = () => {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const { loading, error, historyArticles } = useArticleHistoryStore();

    useEffect(() => {
        console.log("Loading history articles...");
    }, [loading])

    if(loading) {
      return <Skeleton className="h-72 w-full" />
    } 

  return (
    <div className="z-10">
      <Button className="rounded-full bg-sky-500 hover:bg-sky-600" size={"sm"} onClick={() => setIsVisible(!isVisible)}>
      <Clock8 className="h-4 w-4 mr-2" />Article History
      </Button>
      {isVisible && (<ScrollArea className="h-max rounded-xl mt-1 border bg-white">
        <div 
            className="p-4 text-center md:text-left">
          <h4 className="mb-4 text-sm font-medium leading-none">Old versions</h4>
          <Separator />
          {loading && <p>Loading...</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
          { historyArticles.length === 0 && <p className="text-sm text-gray-500 mt-2">No history found!</p>}
          { historyArticles.map((article, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">{article.title}</p>
                <p className="text-xs text-gray-500">{article.timestamp}</p>
              </div>
              <Button variant={"default"} size={"sm"}>Restore</Button>
            </div>
          ))}
        </div>
      </ScrollArea>)}
      
    </div>
  );
};

export default ArticleHistorySelector;
