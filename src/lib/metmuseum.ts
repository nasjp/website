import metmuseumObjectIds from "@/lib/metmuseumObjectIds.json";
import crypto from "crypto";

export const genMetmuseumObjectId = (input: string): string => {
  const hash = crypto.createHash("sha256").update(input).digest("hex");
  const seed = parseInt(hash.slice(0, 8), 16);
  const index = seed % metmuseumObjectIds.objectIDs.length;
  return metmuseumObjectIds.objectIDs[index].toString();
};

export const getImageUrl = async (objectId: string): Promise<string> => {
  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`,
  );
  const data = await response.json();
  return data.primaryImage;
};
