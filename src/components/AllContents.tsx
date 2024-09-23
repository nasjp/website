import { cn } from "@/lib/cn";
import { getAllContents } from "@/lib/content";
import { ContentType } from "@/lib/types";
import Link from "next/link";

interface AllContentsProps {
  category?: ContentType;
}

export const AllContents = async ({ category }: AllContentsProps) => {
  const contents = await getAllContents();
  return (
    <div className="font-semibold text-gray-400">
      {contents.map((content, index) => (
        <Link
          key={content.slug}
          href={`/contents/${content.slug}`}
          passHref
          legacyBehavior
        >
          <span
            className={cn(
              "inline break-all hover:cursor-pointer",
              !category || category === content.category
                ? "text-black"
                : "",
            )}
          >
            {content.title}
            {index !== contents.length - 1 && <span className="mx-1">,</span>}
          </span>
        </Link>
      ))}
    </div>
  );
};
