import { IWikipediaArticle } from "@/lib/interfaces";

interface IArticleCardProps {
    article: IWikipediaArticle;
}

const ArticleItemCard = ({ article }: IArticleCardProps) => {
  return (
    <div className="bg-gray-100 p-4 rounded-xl m-3" key={article.key}>
      <h1 className="font-bold text-md">{article.title}</h1>
      <p className="text-sm">{article.description}</p>
      
    </div>
  );
};

export default ArticleItemCard;
