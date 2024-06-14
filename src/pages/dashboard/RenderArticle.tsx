import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Pencil, Save, Undo2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { TArticle } from "@/lib/types";
import cleanText from "@/lib/cleanText";
import useArticleStore from "@/context/ArticleStore";
import { useAuth } from "@/context/AuthContext";
import ArticleHistorySelector from "@/components/dashboard/ArticleHistorySelector";
import { motion as m, useScroll } from "framer-motion";
import ScrollToTop from "@/utils/ScrollToTop";
import EditToolsBox from "@/components/dashboard/EditToolsBox";

interface IArticleStructure {
    tag: string;
    content: string | null;
}


const RenderArticle = () => {

    const location = useLocation();
    const [dom, setDom] = useState<IArticleStructure[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isError, setIsError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const articleTitle = location.pathname.split("/")[3];

    const { addArticle, error } = useArticleStore();
    const { user } = useAuth();

    const saveArticle = async () => {
        // Save article to the database
        try {
            const token = localStorage.getItem("ACCESS_TOKEN");
            if (!token) {
                console.log("No token found! Impossible to submit the request!");
                setIsError(error);
                return;
            }
    
            const articleToSave: TArticle = {
                title: articleTitle,
                content: JSON.stringify(dom),
                userId: user?.id,
                }

            addArticle(articleToSave);
            console.log("Article saved successfully!", articleToSave);
        } catch (error) {
            console.error(error);
            setIsError("An error occured while saving the article! 😢");
        }

    }

    useEffect(() => {
        console.log(location.pathname);
        const api = `https://api.wikimedia.org/core/v1/wikipedia/en/page/${articleTitle}/html`;
        
        const fetchArticle = async (api: string) => {
            try {
                const response = await axios.get(api);
                const parser = new DOMParser();
                const doc = parser.parseFromString(response.data, "text/html");

                const elements = doc.querySelectorAll('h2, h3, p');
                const contentArray: IArticleStructure[] = [];

                elements.forEach((element) => {
                    contentArray.push({
                            tag: element.tagName.toLowerCase(),
                            content: cleanText(element.textContent!),
                    })
                })

                setDom(contentArray);
            } catch (error) {
                console.error(error);
                setIsError("An error occured while fetching the article! 😢");
            } finally {
                setLoading(false);
            }

        }
            fetchArticle(api);
        

    }, [])

    const { scrollYProgress } = useScroll();


    return (
        <>
            { isEditing && <EditToolsBox setIsEditing={setIsEditing} />}
            <div className=" bg-gray-200 flex gap-6 p-6">
                {/* Button for trigger edit mode */}
                <Button onClick={() => setIsEditing(!isEditing)} className="gradient-bg animate-gradient"><Pencil className="h-4 w-4 mr-2" />Edit Mode</Button>
                {/* Body of the article! */}
                <m.div style={{ scaleX: scrollYProgress }} className="fixed top-0 left-0 right-0 h-3 gradient-bg w-full z-20 origin-top-left"></m.div>
                <div className="bg-white drop-shadow-[0_1.4px_1.4px_rgba(0,0,0,0.8)] p-10 h-full flex flex-col justify-center items-center rounded-sm">
                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-center">{articleTitle}</h1>
                    { loading && <Skeleton className="w-full h-[1000px]" />}
                    <div className="max-w-2xl my-6 text-center md:text-left">
                    { error && <p className="text-red-500 italic">{error} 😢 Try later!</p> }
                    { dom && dom.map((item, index) => {
                        if (item.tag === 'h2') {
                            return <h2 key={index} className="font-bold text-4xl mt-8 mb-3">{item.content}</h2>;
                        } else if (item.tag === 'h3') {
                            return <h3 key={index} className="font-semibold underline text-2xl mt-2 mb-1">{item.content}</h3>;
                        } else if (item.tag === 'p') {
                            return <p key={index} className="text-base leading-5 mb-6">{item.content}</p>;
                        }
                        else {
                            return null;
                        }
                    })}
                    </div>
                    <div className="space-x-2">
                        <Button variant={"outline"} onClick={() => window.history.back()}><Undo2 className="h-4 w-4 mr-2" />Go back</Button>
                        <Button onClick={saveArticle}><Save className="w-4 h-4 mr-2" />Save Article</Button>
                    </div>
                   
                </div>
                <ArticleHistorySelector />
                <ScrollToTop />
            </div>
        </>
    )
}

export default RenderArticle;