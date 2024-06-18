import { TArticle } from "@/lib/types"
import { Link } from "react-router-dom"

interface IArticleIconProps {
    article: TArticle;

}

const ArticleIcon = ({article}: IArticleIconProps) => {
    return (
        <Link to={`./saved-article/${article.id}`}>
            <div className="text-5xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl p-4">
              {/* Qui puoi mettere l'icona dell'articolo, ad esempio un'immagine o un'icona FontAwesome */}
              📰
            <div className="mt-2 text-sm">{article.title}</div>
            </div>
          </Link>
    )
}

export default ArticleIcon;