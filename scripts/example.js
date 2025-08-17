import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";
import wav from "wav";
import { Writable } from "stream";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// ---------------------------
// Supabase client
// ---------------------------
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// ---------------------------
// Convert PCM → WAV buffer
// ---------------------------
async function pcmToWavBuffer(pcmBuffer, channels = 1, sampleRate = 24000, bitDepth = 16) {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({ channels, sampleRate, bitDepth });
    const chunks = [];
    const writable = new Writable({
      write(chunk, enc, next) {
        chunks.push(chunk);
        next();
      },
    });

    writable.on("finish", () => resolve(Buffer.concat(chunks)));
    writable.on("error", reject);

    writer.pipe(writable);
    writer.end(pcmBuffer);
  });
}

// ---------------------------
// Upload audio to Supabase
// ---------------------------
async function uploadAudioToSupabase(audioBuffer, fileName) {
  const filePath = `tts/${fileName}_${Date.now()}.wav`;

  const { error } = await supabase.storage
    .from("audio-files")
    .upload(filePath, audioBuffer, {
      contentType: "audio/wav",
      upsert: true,
    });

  if (error) throw new Error("Upload failed: " + error.message);

  const { data } = supabase.storage.from("audio-files").getPublicUrl(filePath);
  return data.publicUrl;
}

// ---------------------------
// Split text into manageable chunks
// ---------------------------
function chunkText(text, chunkSize = 200) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + chunkSize));
    i += chunkSize;
  }
  return chunks;
}

// ---------------------------
// Convert text → speech (all chunks)
// ---------------------------
async function textToSpeechFull(text, voiceName = "Kore") {
  const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const ttsModel = ai.getGenerativeModel({ model: "gemini-2.5-flash-preview-tts" });

  const chunks = chunkText(text, 200);
  let pcmBuffers = [];

  for (const chunk of chunks) {
    const result = await ttsModel.generateContent({
      contents: [{ parts: [{ text: chunk }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } },
      },
    });

    const candidate = result.response?.candidates?.[0];
    if (!candidate) continue;

    for (const part of candidate.content?.parts ?? []) {
      if (part.inlineData?.data) {
        pcmBuffers.push(Buffer.from(part.inlineData.data, "base64"));
      }
    }
  }

  if (!pcmBuffers.length) throw new Error("No audio generated");

  const fullPcmBuffer = Buffer.concat(pcmBuffers);
  const wavBuffer = await pcmToWavBuffer(fullPcmBuffer);
  return await uploadAudioToSupabase(wavBuffer, "generated_audio");
}

// ---------------------------
// Main
// ---------------------------
async function main() {
  const text = "Hello! This should now generate the full audio for the entire text, not just the first word. " +
               "You can add multiple sentences and it will be processed correctly into a single WAV file.";

  const url = await textToSpeechFull(text);
  console.log("🎯 Public WAV URL:", url);
}

main().catch(console.error);


// // -----------------------------
// // Example usage
// // -----------------------------
// (async () => {
//     const gemini = GeminiClient.getInstance();

//     const imagePrompts = {
//         Realistic: "A hyper-realistic, cinematic photograph of a bustling city street at sunset...",
//         Cartoon: "A vibrant, whimsical cartoon park scene filled with joyful characters...",
//     };

//     const images = await gemini.generateImages(imagePrompts);
//     console.log("✅ Image results:", images);

//     const audioUrl = await gemini.textToSpeech("Say cheerfully: Have a wonderful day!", "Kore");
//     console.log("✅ Audio URL:", audioUrl);

//     const scripts = await gemini.generateScript("write two different scripts for a 30 second video");
//     console.log("✅ Generated scripts:", scripts);
// })();
