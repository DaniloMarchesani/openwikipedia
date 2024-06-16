import { TArticle } from "@/lib/types"
import { Link } from "react-router-dom"

interface IArticleIconProps {
    article: TArticle;

}

const ArticleIcon = ({article}: IArticleIconProps) => {
    return (
        <Link to={`./savedArticle/${article.id}`}>
            <div className="text-5xl cursor-pointer border rounded-lg p-3">
              {/* Qui puoi mettere l'icona dell'articolo, ad esempio un'immagine o un'icona FontAwesome */}
              📰
            <div className="mt-2 text-sm">{article.title}</div>
            </div>
          </Link>
    )
}

export default ArticleIcon;