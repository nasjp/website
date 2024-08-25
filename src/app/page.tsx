import { Win95Window } from "./components/Win95Components";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getAllArticles } from "../lib/mdx";

export async function generateStaticParams() {
  const articles = getAllArticles(["slug"]);
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function Article({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug, ["title", "date", "content"]);

  return (
    <Win95Window title={article.title}>
      <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{article.date}</p>
      <div className="prose win95-inset bg-white p-4">
        <MDXRemote source={article.content} />
      </div>
    </Win95Window>
  );
}
