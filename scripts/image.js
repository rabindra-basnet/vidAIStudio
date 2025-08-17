import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import { config } from "dotenv";

config();

const apiKey = process.env.GOOGLE_API_KEY;
const project = "videogen";

async function main() {

  const ai = new GoogleGenAI(apiKey, { project });

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: 'Robot holding a red skateboard',
    config: {
      numberOfImages: 4,
    },
  });

  let idx = 1;
  for (const generatedImage of response.generatedImages) {
    let imgBytes = generatedImage.image.imageBytes;
    const buffer = Buffer.from(imgBytes, "base64");
    fs.writeFileSync(`imagen-${idx}.png`, buffer);
    idx++;
  }
}

main();