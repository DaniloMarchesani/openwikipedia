import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import HtmlObjectParser from "@/lib/HtmlObjectParser";
import { TArticleHistory } from "@/lib/types";
import { ArchiveRestore, Ban } from "lucide-react";
import { formatDate } from "@/lib/formatDate";

interface IModalArticleProps {
    name: string;
    article: TArticleHistory;
    handleRestoreArticle: (article: TArticleHistory) => void;
}

const ModalArticle = ({name, article, handleRestoreArticle}: IModalArticleProps) => {

    const parser = new HtmlObjectParser();
    const elements = parser.parseJSONToObject(article.content);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" size={"sm"} variant="outline"><ArchiveRestore className="h-4 w-4 mr-2"/>{name}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[calc(100vw/1.5)]">
        <DialogHeader>
          <DialogTitle>{article.title}</DialogTitle>
          <DialogDescription>
            Read the article as it was on {formatDate(article.modifiedAt!)}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[calc(100vh/1.5)] overflow-y-scroll">
          <div className="grid grid-cols-4 items-center gap-4">
            {elements.map((item, index) => {
                if (item.tag === "h2") {
                    return (
                    <h2 key={index} className="font-bold text-4xl mt-8 mb-3 col-span-4">
                        {item.content}
                    </h2>
                    );
                } else if (item.tag === "h3") {
                    return (
                    <h3
                        key={index}
                        className="font-semibold text-3xl mt-2 mb-1 col-span-4"
                    >
                        {item.content}
                    </h3>
                    );
                } else if (item.tag === "p" && item.content!.length > 0) {
                    return (
                    <p key={index} className="text-base leading-5 mb-6 p-2 col-span-4">
                        {item.content}
                    </p>
                    );
                } else {
                    return null;
                }
            })}
          </div>

        </div>
        <DialogFooter>
          <DialogTrigger asChild><Button onClick={() => handleRestoreArticle(article)}><ArchiveRestore className="w-4 h-4 mr-2" />Restore</Button></DialogTrigger>
          <DialogClose asChild><Button variant={"secondary"} ><Ban className="w-4 h-4 mr-2" />Cancel</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export default ModalArticle;