import ArticleHistorySelector from "@/components/dashboard/ArticleHistorySelector";
import EditToolsBox from "@/components/dashboard/EditToolsBox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import useArticleHistoryStore from "@/context/ArticleHistoryStore";
import useArticleStore from "@/context/ArticleStore";
import HtmlObjectParser from "@/lib/HtmlObjectParser";
import { IArticleStructure } from "@/lib/interfaces";
import { TArticle, TArticleHistory } from "@/lib/types";
import ScrollToTop from "@/utils/ScrollToTop";
import axios from "axios";
import debounce from "debounce";
import { motion as m, useScroll } from "framer-motion";
import { Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";
import { useLocation } from "react-router-dom";

const {VITE_BACKEND_URI, VITE_BACKEND_ARTICLE_ENDPOINT } = import.meta.env;

const Article = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { scrollYProgress } = useScroll();
    const [dom ,setDom] = useState<IArticleStructure[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [ articleDetails, setArticleDetails ] = useState<TArticle | null>(null);
    const { getHistoryArticles, restoreHistoryArticle } = useArticleHistoryStore();
    const { updateArticle, articles } = useArticleStore();

    const location = useLocation();

    const articleId = location.pathname.split("/")[3];

    const editContentRef = useRef<HTMLDivElement>(null);


    const hanbleInput = debounce(() => {
      const parser = new HtmlObjectParser();
        const content = [editContentRef.current?.innerHTML];
        const newContent = parser.parseHtmlToObject(editContentRef.current!.innerHTML);
        //console.log(newContent);
        const article: TArticle = {
          title: articleDetails!.title,
          ...articleDetails,
          content: newContent
        };
        console.log("Article input: " + typeof article.content);
        
        const updated = [...dom, newContent]
        console.log("Updated content: ", updated)
        setDom(newContent);
        setArticleDetails(article);
    }, 300);

    const handleRestoreArticle = (article: TArticleHistory) => {
        
      try {
        console.log("Restoring article with id: ", article.articleId);
        restoreHistoryArticle(article);
        
        toast({
          title: "Article restored successfully!",
          description: "You can find it in your articles!",
          action: (
            <ToastAction altText="Go back">Got it!</ToastAction>
          ),
        })
      } catch (error) {
        console.error(error);
      }
  }

    const handleUpdateArticle = () => {
        if (!articleDetails) {
          console.log("No article found! Impossible to update the article!");
          setError("No article found! Impossible to update the article!");
          return;
        }
        const formatter = new HtmlObjectParser();
        const formattedContent = formatter.parseHtmlToObject(articleDetails.content);
        const articleUpdated: TArticle = {
          ...articleDetails,
          content: JSON.stringify(formattedContent),
        };
        updateArticle(articleDetails.id!, articleUpdated);
        const today = new Date();
        toast({
          title: "Article updated successfully!",
          description: `at ${today.toLocaleTimeString()}`,
          action: (
            <ToastAction altText="Thank God">Got it!</ToastAction>
          ),

        })
        setIsEditing(!isEditing);
        console.log("Article updated successfully!");
    }

    useEffect(() => {
        console.log(articleId);

        const url = `${VITE_BACKEND_URI}${VITE_BACKEND_ARTICLE_ENDPOINT}/${articleId}`;
    
        const fetchArticle = async (api: string) => {
          try {
            const token = localStorage.getItem("ACCESS_TOKEN");
            if (!token) {
              console.log("No token found! Impossible to submit the request!");
              setError("No token found! Impossible to submit the request!");
              return;
            }
            const response = await axios.get(api, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const article: TArticle = await response.data;
            const arrayOfContent: IArticleStructure[] = JSON.parse(article.content);
            setArticleDetails(article);
            getHistoryArticles(article.id!);
            setDom(arrayOfContent);
          } catch (error) {
            console.error(error);
            setError("An error occured while fetching the article! 😢");
          } finally {
            setIsLoading(false);
          }
        };
        fetchArticle(url);
        console.log("Article fetched successfully!")
      }, [articles]);

  return (
    <div>
      {isEditing && <EditToolsBox 
      setIsEditing={setIsEditing} 
      handleUpdateArticle={handleUpdateArticle}/>}
      <div className=" flex gap-6 p-6 md:p-12">
        <div className="flex flex-col gap-3">
          {/* Button for trigger edit mode */}
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="gradient-bg animate-gradient"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit Mode
          </Button>
          {/* Button for download the article */}
          {/* <Button variant={"default"} onClick={() => downloadArticleAsPDF(dom)}>
            <FileDown className="h-4 w-4 mr-2" />
            Download PDF
          </Button> */}
        </div>
        {/* Body of the article! */}
        <m.div
          style={{ scaleX: scrollYProgress }}
          className="fixed top-0 left-0 right-0 h-3 gradient-bg w-full z-20 origin-top-left"
        ></m.div>
        {/* Article content! */}
        <div className="bg-white dark:bg-gray-800 drop-shadow-md p-10 h-full flex flex-col justify-center items-center rounded-sm">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-center">
              {articleDetails?.title}
          </h1>
          {/* CONTAINER OF THE article.content */}
          <div
            ref={editContentRef}
            onInput={hanbleInput}
            contentEditable={isEditing}
            suppressContentEditableWarning={true} 
            /* dangerouslySetInnerHTML={{ __html: articleDetails!.content }} */
          >
            
            <div key={articleId} className="max-w-2xl my-6 text-center md:text-left">
            {isLoading && <Skeleton className="w-[700px] h-[800px]" />}
              {error && (
                <p className="text-red-500 italic">{error} 😢 Try later!</p>
              )}
              <>
                {dom &&
                  dom.map((item, index) => {
                    if (item.tag === "h2" && item.content!.length > 0) {
                      return (
                          <h2 key={index} className="font-bold text-4xl mt-8 mb-3">
                            {item.content}
                          </h2>
                      );
                    } else if (item.tag === "h3" && item.content!.length > 0) {
                      return (
                        <h3
                          key={index}
                          className="font-semibold text-2xl mt-2 mb-1"
                        >
                          {item.content}
                        </h3>
                      );
                    } else if (item.tag === "p" && item.content!.length > 0) {
                      return (
                          <p key={index} className="text-base leading-5 mb-6">
                            {item.content}
                          </p>
                      );
                    }
                  })}
              </>
            </div>
          </div>
        </div>
        <ArticleHistorySelector handleRestoreArticle={handleRestoreArticle} />
        <ScrollToTop />
      </div>
    </div>
  );
}

export default Article;