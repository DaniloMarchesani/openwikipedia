import { Clock8 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import useArticleHistoryStore from "@/context/ArticleHistoryStore";
import { AnimatePresence, motion as m } from "framer-motion";
import Spinner from "../common/Spinner";
import { formatDate } from "@/lib/formatDate";
import ModalArticle from "./modal/ModalArticle";


const ArticleHistorySelector = () => {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const { loading, error, historyArticles } = useArticleHistoryStore();

    useEffect(() => {
        console.log("Loading history articles...");
        console.log(historyArticles);
        historyArticles.forEach(article => console.log(article.modifiedAt));
    }, [loading])


  return (
   
      <div className="flex flex-col items-start">
        <Button className="rounded-full bg-sky-500 hover:bg-sky-600" size={"sm"} onClick={() => setIsVisible(!isVisible)}>
        <Clock8 className="h-4 w-4 mr-2" />Article History
        </Button>
        <AnimatePresence>
        {isVisible && (<m.div
          initial={{ opacity: 0, height:0 }}
          animate={{ opacity: 1, height: "auto"}}
          exit={{ opacity: 0, height: 0, }}
          transition={{ duration: 0.3}}
        >
          <ScrollArea className="h-max rounded-xl mt-2 border bg-white dark:bg-gray-900 dark:border-gray-800">
          <div 
              className="p-4 text-center md:text-left">
            <h4 className="mb-4 text-sm font-medium leading-none">Old versions</h4>
            <Separator />
            {loading && <Spinner />}
            {error && <p className="text-sm text-red-500">{error}</p>}
            { historyArticles.length === 0 && <p className="text-sm text-gray-500 mt-2">No history found!</p>}
            { historyArticles.map((article, index) => (
              <div key={index} className="flex justify-between items-center gap-4 my-2">
                <div> 
                  <p className="text-xs text-gray-500">{formatDate(article.modifiedAt!)}</p>
                </div>
                {/* <Button className="bg-blue-400 rounded-full" size={"sm"}><ArchiveRestore className="w-4 h-4 mr-2" />Restore</Button> */}
                <ModalArticle name={"Restore"} article={article} />
              </div>
            ))}
          </div>
        </ScrollArea></m.div>)}
        </AnimatePresence>
      </div>
  );
};

export default ArticleHistorySelector;
