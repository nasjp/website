import { ArticleList } from "@/components/ArticleList";
import { ContentType } from "@/lib/types";

interface CategoryProps {
  params: {
    category: string;
  };
}

export default function Category({ params }: CategoryProps) {
  if (params.category === "all") {
    return <ArticleList />;
  }
  const category = params.category as ContentType;
  return <ArticleList category={category} />;
}
