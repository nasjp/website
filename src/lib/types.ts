export type StatusType = "published" | "draft" | "archived";

export type ContentType = "articles" | "works" | "memos" | "about";

export type Article = {
  slug: string;
  title: string;
  datetime: Date;
  category: ContentType;
  status: StatusType;
  content: string;
  excerpt: string;
  imageUrl: string;
};

export const contentColors: Record<ContentType, string> = {
  articles: "text-green-500",
  works: "text-red-500",
  memos: "text-blue-500",
  about: "text-black",
};
