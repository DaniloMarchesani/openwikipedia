import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { IDailyArticleStructure } from "@/lib/interfaces";
import { Skeleton } from "../ui/skeleton";
import { Forward, X } from "lucide-react";
import { motion as m } from "framer-motion";

const { VITE_WIKI_ACCESS_TOKEN} = import.meta.env;

const DailyArticleBanner = () => {

    const [article, setArticle] = useState<IDailyArticleStructure | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisibile, setIsVisible] = useState(true);

    const handleVisibility = () => {
        setIsVisible(!isVisibile);
    }

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth().toString().padStart(2, "0");
        const day = today.getDate().toString().padStart(2, "0");
        const formattedDate = `${year}/${month}/${day}`;
        const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${formattedDate}`;


        if(isLoaded) return;
        axios.get(url,{
            headers: {
                "Authorization" : `Bearer ${VITE_WIKI_ACCESS_TOKEN}`
            }
        }).then(response => {
            console.log(response.data.tfa);
            setArticle(response.data.tfa);
            setIsLoaded(true);
        }).catch(error => {
            console.error(error);
        }
        ).finally(() => console.log(article));
    }, [article]);

    return (
                <div>
                    {isVisibile && <m.div 
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0}}
                    exit={{ opacity: 0, y: -100, }}
                    transition={{ duration: 0.2}}   
                    className="w-full">
                        { article ? (<div className="text-white p-1 text-sm flex items-center justify-center gap-2 gradient-bg animate-gradient border italic">
                            <p>🗣️ Hey! Todays article is about <span className="font-semibold">{article?.titles.normalized}</span></p>
                            <Button asChild className="rounded-full"  size={"sm"}>
                                <Link 
                                to={"./article/" + article?.title}
                                state={{ article: article}}
                                ><Forward className="h-4 w-4 mr-1" />Take a Look </Link>
                            </Button>
                            <X  onClick={() => handleVisibility()}/>
                        </div>): (<Skeleton className="p-4 w-full h-10 mb-1"/>)}
                    </m.div>}
        
                </div>
    );
}

export default DailyArticleBanner;