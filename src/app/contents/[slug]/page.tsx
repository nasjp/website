import { getAllArticles, getArticleBySlug } from "@/lib/mdx";
import type { Metadata, ResolvingMetadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return {
      title: "Not Found",
    };
  }

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
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return notFound();
  }

  return (
    <div className="w-full max-w-xl">
      <h1 className="font-bold my-2">{article.title}</h1>
      <div className="w-full max-w-xl mx-auto h-60 flex justify-center items-center">
        <Image
          src={article.imageUrl}
          alt={article.title}
          width={480}
          height={320}
          className="object-contain w-full h-full"
          loading="lazy"
          placeholder="blur"
          blurDataURL={"/blur.png"}
        />
      </div>
      <p className="text-gray-600 text-sm whitespace-nowrap">
        {article.datetime.toLocaleDateString()}
      </p>
      <p className="text-gray-600 text-sm text-gray-300">{article.category}</p>
      <div>---</div>
      <div className="prose">
        <MDXRemote source={article.content} />
      </div>
    </div>
  );
}
