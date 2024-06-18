import { TArticle } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ExternalLink, Frown, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import Spinner from "../common/Spinner";

interface IArticleTableProps {
    articles: TArticle[] | null;
    handleDelete: (id: string) => void;
    loading: boolean;
}

const ArticleTable = ({ articles, handleDelete, loading }: IArticleTableProps) => {

    const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Article</TableHead>
          <TableHead className="text-center">Open</TableHead>
          <TableHead className="text-center">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && (<TableRow>
            <TableCell><Spinner /></TableCell>
            <TableCell><Spinner /></TableCell>
            <TableCell><Spinner /></TableCell>
        </TableRow>)}
        {!loading && articles && articles.map((article, index) => (
            <TableRow key={index}>
                <TableCell className="font-medium text-left">{article.title}</TableCell>
                <TableCell><Button variant={"outline"} size={"icon"} onClick={() => navigate(`/dashboard/saved-article/${article.id}`)}><ExternalLink className="h-4 w-4" /></Button></TableCell>
                <TableCell className="text-right"><Button variant={"destructive"} size={"icon"} onClick={() => handleDelete(article.id!)}><Trash2 className="h-4 w-4" /></Button></TableCell>
            </TableRow>
        ))}
        {articles?.length === 0 && (<TableRow>
            <TableCell colSpan={4} className="text-center"><p className="flex items-center justify-center"><Frown className="h-4 w-4 mr-2" />Seems you dont have any article saved yet!</p></TableCell>
            </TableRow>)}
      </TableBody>
    </Table>
  );
};

export default ArticleTable;
