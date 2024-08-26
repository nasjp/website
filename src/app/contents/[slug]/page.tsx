import { getAllArticles, getArticleBySlug } from "@/lib/mdx";
import type { Metadata, ResolvingMetadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export const generateStaticParams = async () => {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
};

export const generateMetadata = async (
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${article.title} | nasjp's website`,
    description: article.excerpt,
  };
};

const components = {
  code: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={base16AteliersulphurpoolLight}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

interface ArticleProps {
  params: { slug: string };
}

export default async function Article({ params }: ArticleProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return notFound();
  }

  return (
    <div className="w-full max-w-xl">
      <h1 className="font-bold mb-2">{article.title}</h1>
      <div className="w-full max-w-xl mx-auto h-60 flex justify-center items-center mb-2">
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
        {article.datetime.toISOString()}
      </p>
      <p className="text-sm text-gray-600 font-thin underline">
        {article.category}
      </p>
      <div className="prose mt-8">
        <MDXRemote source={article.content} components={components} />
      </div>
    </div>
  );
}
