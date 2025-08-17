
import { createClient } from "@deepgram/sdk";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const deepgramApiKey = process.env.DEEPGRAM_API_KEY;

if (!deepgramApiKey) {
    throw new Error("❌ DEEPGRAM_API_KEY is missing in .env.local");
}

export const deepgram = new createClient(deepgramApiKey);
