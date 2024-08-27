import { AllContents } from "@/components/AllContents";
import { ContentType } from "@/lib/types";

interface CategoryProps {
  params: {
    category: string;
  };
}

export default function Category({ params }: CategoryProps) {
  if (params.category === "all") {
    return <AllContents />;
  }
  const category = params.category as ContentType;
  return <AllContents category={category} />;
}
