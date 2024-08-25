import Link from "next/link";
import { getAllArticles } from "../../lib/mdx";

export default function ArticleList() {
  const articles = getAllArticles(["slug", "title"]);

  return (
    <ul className="space-y-2">
      {articles.map((article) => (
        <li key={article.slug} className="p-2 bg-gray-200 hover:bg-blue-300 cursor-pointer">
          <Link href={`/articles/${article.slug}`} className="block">
            {article.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
