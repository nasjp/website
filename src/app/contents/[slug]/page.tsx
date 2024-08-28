import { getAllContents, getContentBySlug } from "@/lib/content";
import type { Metadata, ResolvingMetadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export const generateStaticParams = async () => {
  const contents = await getAllContents();
  return contents.map((content) => ({
    slug: content.slug,
  }));
};

export const generateMetadata = async (
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const content = await getContentBySlug(params.slug);
  if (!content) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${content.title} | nasjp's website`,
    description: content.excerpt,
  };
};

const getLanguageFromFilename = (filename: string): string => {
  const extensionMap: { [key: string]: string } = {
    js: "javascript",
    ts: "typescript",
    py: "python",
    rb: "ruby",
    java: "java",
    cpp: "cpp",
    cs: "csharp",
    go: "go",
    rs: "rust",
    php: "php",
    html: "html",
    css: "css",
    json: "json",
    yml: "yaml",
    yaml: "yaml",
    md: "markdown",
    sh: "bash",
    bash: "bash",
    sql: "sql",
  };

  const specialCases: { [key: string]: string } = {
    Dockerfile: "dockerfile",
    Makefile: "makefile",
    package: "json",
  };

  if (specialCases[filename]) {
    return specialCases[filename];
  }

  const ext = filename.split(".").pop()?.toLowerCase();
  return ext ? extensionMap[ext] || ext : "";
};

interface Code {
  props: { className: string; children: string };
  type: string;
}

const isCodeBlock = (children: any): children is Code => {
  return children.type === "code";
};

const components = {
  code: (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }) => {
    return (
      <code
        className="not-prose bg-gray-100 text-red-500 text-sm py-1 px-2 rounded-md mx-2"
        {...props}
      />
    );
  },
  pre: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\S+)/.exec(children.props.className || "");

    let displayLanguage = "";
    let displayText = "";

    if (match) {
      const [, languageAndFilename] = match;
      const parts = languageAndFilename.split(".");

      if (parts.length > 1) {
        displayLanguage = parts.pop() || "";
        displayText = languageAndFilename;
      } else {
        displayText = languageAndFilename;
        displayLanguage = getLanguageFromFilename(languageAndFilename);
      }
    }

    return !inline ? (
      <div className="relative">
        {displayText && (
          <div className="not-prose absolute top-0 right-0 bg-gray-200 px-2 py-1 text-xs font-mono rounded-bl">
            {displayText}
          </div>
        )}
        <SyntaxHighlighter
          style={base16AteliersulphurpoolLight}
          language={displayLanguage}
          PreTag="div"
          customStyle={{ paddingTop: "2rem" }}
          className="not-prose"
          {...props}
        >
          {String(children.props.children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className="bg-gray-200 text-red-500" {...props}>
        {children}
      </code>
    );
  },
};

interface ContentProps {
  params: { slug: string };
}

export default async function Content({ params }: ContentProps) {
  const content = await getContentBySlug(params.slug);
  if (!content) {
    return notFound();
  }

  return (
    <div className="w-full max-w-xl">
      <div className="relative w-full max-w-screen-xl">
        <Image
          src={content.imageUrl}
          alt={content.title}
          width={1080}
          height={1920}
          className="w-full h-auto object-contain"
          priority
          placeholder="blur"
          blurDataURL={"/blur.png"}
        />
        <div className="py-2">
          <div className="text-xs font-mono">
            {content.imageTitle} by {content.imageArtistDisplayName}
          </div>
          <div className="text-xs font-mono">{content.imageObjectDate}</div>
        </div>
      </div>
      <div className="border-y border-black border-t-2 py-2 md:my-8">
        <p className="text-sm text-gray-600 font-thin underline capitalize">
          {content.category}
        </p>
        <h1 className="font-bold my-2">{content.title}</h1>
        <p className="text-gray-600 text-sm whitespace-nowrap">
          {content.datetime.toISOString()}
        </p>
      </div>
      <div className="prose pt-2 md:mt-8">
        {/* <MDXRemote source={content.content} components={components} /> */}
        <MDXRemote source={content.content} components={components} />
      </div>
    </div>
  );
}
