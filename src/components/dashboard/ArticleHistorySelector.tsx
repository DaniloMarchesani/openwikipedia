import { Clock8 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useState } from "react";

const ArticleHistorySelector = () => {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );

  

  return (
    <div className="z-10">
      <Button className="rounded-full bg-sky-500 hover:bg-sky-600" size={"sm"} onClick={() => setIsVisible(!isVisible)}>
      <Clock8 className="h-4 w-4 mr-2" />Article History
      </Button>
      {isVisible && (<ScrollArea className="h-72 rounded-xl mt-1 border bg-white">
        <div 
            className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          {tags.map((tag) => (
            <>
              <div key={tag} className="text-sm">
                {tag}
              </div>
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>)}
      
    </div>
  );
};

export default ArticleHistorySelector;
