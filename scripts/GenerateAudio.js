import { GoogleGenerativeAI } from "@google/generative-ai";
import wav from "wav";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function saveWaveFile(
  filename,
  pcmData,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
) {
  return new Promise((resolve, reject) => {
    const writer = new wav.FileWriter(filename, {
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    writer.on("finish", resolve);
    writer.on("error", reject);

    writer.write(pcmData);
    writer.end();
  });
}

async function main(text, voiceName) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY not set in environment variables");
  }

  const ai = new GoogleGenerativeAI(apiKey);

  const model = ai.getGenerativeModel({
    model: "gemini-2.5-flash-preview-tts",
  });

  const result = await model.generateContent({
    contents: [{ parts: [{ text: text }] }],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: voiceName },
        },
      },
    },
  });

  const data =
    result.response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

  if (!data) {
    throw new Error("No audio data returned from API");
  }

  // const audioBuffer = Buffer.from(data, "base64");
  // await saveWaveFile("out.wav", audioBuffer);

  console.log("Audio saved to out.wav", data);
}

const PROMPT = "Say cheerfully: Have a wonderful day!";
const VOICE_NAME = "Kore";

await main(PROMPT, VOICE_NAME);
