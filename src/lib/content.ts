import { Content, ContentType, StatusType } from "@/lib/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { genMetmuseumObjectId, getImageData } from "./metmuseum";

const containsDraft = process.env.NEXT_PUBLIC_CONTAINS_DRAFT === "true";

const contentsDirectory = path.join(process.cwd(), "contents");

export const getContentSlugs = (): string[] => {
  return fs.readdirSync(contentsDirectory);
};

export const getContentBySlug = async (
  slug: string,
): Promise<Content | null> => {
  if (slug === "") {
    console.error("Slug is undefined");
    return null;
  }

  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(contentsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const imageData = await getImageData(genMetmuseumObjectId(realSlug));

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
    imageObjectID: imageData.objectID,
    imageTitle: imageData.title,
    imageArtistDisplayName: imageData.artistDisplayName,
    imageObjectDate: imageData.objectDate,
    imageIsPublicDomain: imageData.isPublicDomain,
    rawImageUrl: imageData.primaryImage,
    imageUrl: `/contents/images/${realSlug}.jpg`,
  };
};

export const getAllContents = async (): Promise<Content[]> => {
  const slugs = getContentSlugs();
  const contents = (
    await Promise.all(slugs.map((slug) => getContentBySlug(slug)))
  )
    .filter((content): content is Content => content !== null)
    .filter((content) => containsDraft || content.status === "published")
    .sort((content1, content2) =>
      content1.datetime > content2.datetime ? -1 : 1,
    );
  return contents;
};
