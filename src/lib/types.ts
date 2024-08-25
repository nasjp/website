export type ContentType = "articles" | "works" | "links" | "about";

export const contentColors: Record<ContentType, string> = {
  articles: "text-green-500",
  works: "text-red-500",
  links: "text-blue-500",
  about: "text-black",
};
