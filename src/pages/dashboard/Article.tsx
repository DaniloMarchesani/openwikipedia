import ArticleHistorySelector from "@/components/dashboard/ArticleHistorySelector";
import EditToolsBox from "@/components/dashboard/EditToolsBox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IArticleStructure } from "@/lib/interfaces";
import { TArticle } from "@/lib/types";
import ScrollToTop from "@/utils/ScrollToTop";
import axios from "axios";
import { motion as m, useScroll } from "framer-motion";
import { Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const {VITE_BACKEND_URI, VITE_BACKEND_ARTICLE_ENDPOINT } = import.meta.env;

const Article = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { scrollYProgress } = useScroll();
    const [dom ,setDom] = useState<IArticleStructure[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const location = useLocation();

    const articleTitle = location.pathname.split("/")[3];

    const editContentRef = useRef<HTMLDivElement>(null);


    const hanbleInput = () => {
        console.log("Input changed!");
    }

    useEffect(() => {
        console.log(location.pathname);
        const url = `${VITE_BACKEND_URI}${VITE_BACKEND_ARTICLE_ENDPOINT}/${articleTitle}`;
    
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
            
            setDom(arrayOfContent);
          } catch (error) {
            console.error(error);
            setError("An error occured while fetching the article! 😢");
          } finally {
            setLoading(false);
          }
        };

        fetchArticle(url);
      }, []);

  return (
    <>
      {isEditing && <EditToolsBox setIsEditing={setIsEditing} />}
      <div className=" flex gap-6 p-6">
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
        <div
          ref={editContentRef}
          onInput={hanbleInput}
          contentEditable={isEditing}
          className="bg-white dark:bg-gray-800 drop-shadow-md p-10 h-full flex flex-col justify-center items-center rounded-sm"
        >
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-center">
            {articleTitle}
          </h1>
          <div className="max-w-2xl my-6 text-center md:text-left">
          {loading && <Skeleton className="w-[700px] h-[800px]" />}
            {error && (
              <p className="text-red-500 italic">{error} 😢 Try later!</p>
            )}
            {dom &&
              dom.map((item, index) => {
                if (item.tag === "h2") {
                  return (
                    <h2 key={index} className="font-bold text-4xl mt-8 mb-3">
                      {item.content}
                    </h2>
                  );
                } else if (item.tag === "h3") {
                  return (
                    <h3
                      key={index}
                      className="font-semibold text-2xl mt-2 mb-1"
                    >
                      {item.content}
                    </h3>
                  );
                } else if (item.tag === "p") {
                  return (
                    <p key={index} className="text-base leading-5 mb-6">
                      {item.content}
                    </p>
                  );
                } else {
                  return null;
                }
              })}
          </div>
        </div>
        <ArticleHistorySelector />
        <ScrollToTop />
      </div>
    </>
  );
}

export default Article;