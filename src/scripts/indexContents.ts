import { ALGOLIA_APP_ID, ALGOLIA_INDEX_NAME } from "@/lib/algolia";
import algoliasearch from "algoliasearch";
import { getAllContents } from "../lib/content";

const ALGOLIA_WRITE_API_KEY = process.env.ALGOLIA_WRITE_API_KEY!;

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_WRITE_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

const indexContents = async () => {
  const contents = await getAllContents();

  const objects = await Promise.all(
    contents.map(async (content) => {
      return {
        objectID: content.slug,
        title: content.title,
        date: content.datetime.toISOString(),
        category: content.category,
        content: content.content,
        imageUrl: content.imageUrl,
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
