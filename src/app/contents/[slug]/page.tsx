import { getAllArticles, getArticleBySlug } from "@/lib/mdx";
import type { Metadata, ResolvingMetadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const articles = getAllArticles(["slug"]);
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const article = getArticleBySlug(params.slug, ["title", "date", "content"]);

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug, ["title", "date", "content"]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{article.date}</p>
      <div className="prose">
        <MDXRemote source={article.content} />
      </div>
    </div>
  );
}
