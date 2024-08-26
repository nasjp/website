import { Article, ContentType, StatusType } from "@/lib/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { genMetmuseumObjectId, getImageUrl } from "./metmuseum";

const articlesDirectory = path.join(process.cwd(), "contents");

export const getArticleSlugs = (): string[] => {
  return fs.readdirSync(articlesDirectory);
};

export const getArticleBySlug = async (
  slug: string,
): Promise<Article | null> => {
  if (slug === "") {
    console.error("Slug is undefined");
    return null;
  }

  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(articlesDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const imageUrl = await getImageUrl(genMetmuseumObjectId(realSlug));

  const title = (data.title as string) || realSlug;
  const category = (data.category as ContentType) || "articles";
  const status = (data.status as StatusType) || "archived";
  const date = new Date(data.datetime) || new Date();
  return {
    slug: realSlug,
    title: title,
    datetime: date,
    category: category,
    status: status,
    content: content,
    excerpt: (data.excerpt as string) || "",
    imageUrl: imageUrl,
  };
};

export const getAllArticles = async (): Promise<Article[]> => {
  const slugs = getArticleSlugs();
  const articles = (
    await Promise.all(slugs.map((slug) => getArticleBySlug(slug)))
  )
    .filter((article): article is Article => article !== null)
    .sort((article1, article2) =>
      article1.datetime > article2.datetime ? -1 : 1,
    );
  return articles;
};
