import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getAllArticles } from "../../../lib/mdx";

export async function generateStaticParams() {
  const articles = getAllArticles(["slug"]);
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function Article({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug, ["title", "date", "content"]);

  return (
    <div className="windows-95-window">
      <div className="windows-95-title-bar">
        <span>{article.title}</span>
        <button className="windows-95-close-button">X</button>
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
        <p className="text-sm text-gray-500 mb-4">{article.date}</p>
        <div className="prose">
          <MDXRemote source={article.content} />
        </div>
      </div>
    </div>
  );
}
