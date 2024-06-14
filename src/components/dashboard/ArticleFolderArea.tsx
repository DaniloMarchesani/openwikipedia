
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu";
import ArticleIcon from "./ArticleIcon";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Telescope } from "lucide-react";
import { TArticle } from "@/lib/types";

interface IArticleFolderAreaProps {
  articles: TArticle[];

}

const ArticleFolderArea = ({ articles }: IArticleFolderAreaProps) => {
  

  return (
    <ContextMenu>
      <h2 className="text-xl mb-2 font-semibold">Virtual Desk</h2>
      <ContextMenuTrigger className="flex min-h-[calc(100vh/2)] w-[90%] items-center justify-center rounded-md border border-dashed text-sm p-10 bg-white dark:bg-gray-950 overflow-y-scroll">
        {articles.length === 0 ? (<p>No articles found!</p>) : (
          <div className="flex flex-wrap">
              {articles.map((article, index) => (
                <div key={index} className="m-4 text-center grid grid-cols-5 gap-6 w-full">
                  <ArticleIcon article={article} />
                </div>
              ))}
          </div>
        )}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Save Page As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
      <Button asChild variant={"outline"} className="mt-4 text-blue-500"><Link to={"./explorer"}><Telescope className="w-4 h-4 mr-2" />See your Explorer</Link></Button>
    </ContextMenu>
  )
};

export default ArticleFolderArea;
