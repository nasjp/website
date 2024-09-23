export type StatusType = "published" | "draft" | "archived";

export type ContentType = "articles" | "works" | "memos" | "about";

export type Content = {
  slug: string;
  title: string;
  datetime: Date;
  category: ContentType;
  status: StatusType;
  content: string;
  excerpt: string;
  imageObjectID: string;
  imageTitle: string;
  imageArtistDisplayName: string;
  imageObjectDate: string;
  imageIsPublicDomain: boolean;
  rawImageUrl: string;
  imageUrl: string;
};
