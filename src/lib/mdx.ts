import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export function getArticleSlugs(): string[] {
  return fs.readdirSync(articlesDirectory);
}

export function getArticleBySlug(slug: string | undefined, fields: string[] = []): Record<string, any> {
  if (!slug) {
    console.error("Slug is undefined");
    return {};
  }

  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(articlesDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return {};
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Record<string, any> = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllArticles(fields: string[] = []): Record<string, any>[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug, fields))
    .filter((article) => Object.keys(article).length > 0)
    .sort((article1, article2) => (article1.date > article2.date ? -1 : 1));
  return articles;
}
