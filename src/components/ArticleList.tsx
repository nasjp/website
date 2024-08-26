import { cn } from "@/lib/cn";
import { getAllArticles } from "@/lib/mdx";
import { contentColors, ContentType } from "@/lib/types";
import Link from "next/link";

interface ArticleListProps {
  category?: ContentType;
}

export const ArticleList = async ({ category }: ArticleListProps) => {
  const articles = await getAllArticles();
  return (
    <div className="font-bold text-gray-400">
      {articles.map((article, index) => (
        <Link
          key={article.slug}
          href={`/contents/${article.slug}`}
          passHref
          legacyBehavior
        >
          <span
            className={cn(
              "inline break-all break-words hover:cursor-pointer",
              !category || category === article.category
                ? contentColors[article.category as ContentType]
                : "",
            )}
          >
            {article.title}
            {index !== articles.length - 1 && <span className="mx-1">,</span>}
          </span>
        </Link>
      ))}
    </div>
  );
};
