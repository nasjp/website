import type { Metadata } from "next";
import "./globals.css";
import { Win95Window, Win95List, Win95ListItem } from "./components/Win95Components";
import Link from "next/link";
import { getAllArticles } from "../lib/mdx";
import { ClientSearchForm } from "./components/ClientSearchForm";

export const metadata: Metadata = {
  title: "Windows 95 Blog",
  description: "A blog with Windows 95 style UI",
};

type Article = {
  slug: string;
  title: string;
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#008080] p-4">
        <div className="flex gap-4 max-w-6xl mx-auto">
          <Sidebar />
          <main className="flex-1">
            <Win95Window title="Content">{children}</Win95Window>
          </main>
        </div>
      </body>
    </html>
  );
}

function Sidebar() {
  const articles = getAllArticles(["slug", "title"]) as Article[];

  return (
    <aside className="w-64 flex-shrink-0">
      <Win95Window title="Blog Navigator">
        <div className="p-2">
          <ClientSearchForm />
          <nav aria-label="Blog posts">
            <h2 className="text-sm font-bold mb-2">All Articles</h2>
            <ArticleList articles={articles} />
          </nav>
        </div>
      </Win95Window>
    </aside>
  );
}

function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <Win95List>
      {articles.map((article) => (
        <Link key={article.slug} href={`/articles/${article.slug}`} passHref>
          <Win95ListItem>
            <span className="block truncate">{article.title}</span>
          </Win95ListItem>
        </Link>
      ))}
    </Win95List>
  );
}
