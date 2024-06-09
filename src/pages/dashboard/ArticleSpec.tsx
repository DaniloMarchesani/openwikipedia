import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

const ArticleSpec = () => {

    const [page, setPage] = useState({});

    const getContent = async () => {
        
        const api = "https://en.wikipedia.org/w/api.php?action=parse&prop=text&page=Pizza&format=json";

        const resp = await fetch(api, {
            headers: {
                'Origin': '*',
            }
        });

        const data = await resp.json();
        setPage(data);
    }

    useEffect(() => {
        console.log(page);
    }, [page]);


    return (
        <div>
            <h1>ArticleSpec</h1>
            <Button onClick={getContent}>See page</Button>
        </div>
    );
}

export default ArticleSpec;