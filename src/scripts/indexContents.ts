import { ALGOLIA_APP_ID, ALGOLIA_INDEX_NAME } from "@/lib/algolia";
import algoliasearch from "algoliasearch";
import { getAllArticles } from "../lib/mdx";

const ALGOLIA_WRITE_API_KEY = process.env.ALGOLIA_WRITE_API_KEY!;

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_WRITE_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

const indexContents = async () => {
  const articles = await getAllArticles();

  const objects = await Promise.all(
    articles.map(async (article) => {
      return {
        objectID: article.slug,
        title: article.title,
        date: article.datetime.toISOString(),
        category: article.category,
        content: article.content,
        imageUrl: article.imageUrl,
      };
    }),
  );

  try {
    const { objectIDs } = await index.saveObjects(objects);
    console.log(`Indexed ${objectIDs.length} documents to Algolia`);
  } catch (error) {
    console.error("Error indexing documents:", error);
  }
};

indexContents().catch(console.error);
