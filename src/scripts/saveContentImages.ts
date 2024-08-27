import fs from "fs";
import path from "path";
import { getAllContents } from "../lib/content";

const publicDirectory = path.join(process.cwd(), "public");
const imagesDirectory = path.join(publicDirectory, "contents", "images");

async function downloadImage(url: string, filepath: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
}

async function saveContentImages(): Promise<void> {
  try {
    if (!fs.existsSync(imagesDirectory)) {
      fs.mkdirSync(imagesDirectory, { recursive: true });
    }

    const contents = await getAllContents();

    for (const content of contents) {
      if (content.rawImageUrl) {
        const imagePath = path.join(imagesDirectory, `${content.slug}.jpg`);

        if (fs.existsSync(imagePath)) {
          console.log(`Image for ${content.slug} already exists. Skipping...`);
          continue;
        }

        console.log(`Downloading image for ${content.slug}...`);
        await downloadImage(content.rawImageUrl, imagePath);
        console.log(`Image saved: ${imagePath}`);
      } else {
        console.log(`No image URL found for ${content.slug}`);
      }
    }

    console.log("All images have been processed successfully.");
  } catch (error) {
    console.error("An error occurred while processing images:", error);
  }
}

saveContentImages();
