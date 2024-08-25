import { NextResponse } from "next/server";
import { getAllArticles } from "../../../lib/mdx";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  const articles = getAllArticles(["slug", "title", "content"]);
  const searchResults = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.content.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json(searchResults.map(({ slug, title }) => ({ slug, title })));
}
