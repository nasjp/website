import metmuseumObjectIds from "@/lib/metmuseumObjectIds.json";
import crypto from "crypto";

export const genMetmuseumObjectId = (input: string): string => {
  const hash = crypto.createHash("sha256").update(input).digest("hex");
  const seed = parseInt(hash.slice(0, 8), 16);
  const index = seed % metmuseumObjectIds.objectIDs.length;
  return metmuseumObjectIds.objectIDs[index].toString();
};

interface MetmuseumObject {
  objectID: string;
  title: string;
  artistDisplayName: string;
  objectDate: string;
  primaryImage: string;
  isPublicDomain: boolean;
}

export const getImageData = async (
  objectId: string,
): Promise<MetmuseumObject> => {
  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`,
  );
  const data = await response.json();
  return {
    objectID: data.objectID,
    title: data.title || "Untitled",
    artistDisplayName: data.artistDisplayName || "Unknown",
    objectDate: data.objectDate || "Unknown",
    primaryImage: data.primaryImage || "",
    isPublicDomain: data.isPublicDomain,
  };
};
