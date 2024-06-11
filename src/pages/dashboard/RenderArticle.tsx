import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const RenderArticle = () => {

    const location = useLocation();

    const articleId = location.pathname.split("/")[3];

    useEffect(() => {
        console.log(location.pathname);
    }, [location])

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-center">Article ID: {articleId}</h1>
            <p className="text-lg text-center">Location: {location.pathname}</p>
        </div>
    )
}

export default RenderArticle;