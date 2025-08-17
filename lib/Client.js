import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import sharp from "sharp";
import wav from "wav";
import { Writable } from "stream";
import { supabase } from "../configs/SuperbaseConfig";
import { deepgram } from "../configs/DeepgramConfig";


dotenv.config({ path: ".env.local" });

let geminiInstance = null;

/**
 * Singleton class to access the GeminiClient
 */
class APIClient {
    constructor() { }

    static getInstance() {
        if (!geminiInstance) {
            geminiInstance = new Client();
        }
        return geminiInstance;
    }
}

/**
 * Main client class to interact with Google Gemini AI
 */
class Client {
    constructor() {
        const apiKey = process.env.GOOGLE_API_KEY;
        const textGeminiKey = process.env.GEMINI_API_KEY;
        const audioGeminiKey = process.env.ANOTHER_GEMINI_API_KEY;
        if (!apiKey) throw new Error("❌ GOOGLE_API_KEY not found in environment variables");
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.genText = new GoogleGenerativeAI(textGeminiKey);
        this.genaudio = new GoogleGenerativeAI(audioGeminiKey);
    }

    /**
 * Uploads a buffer (image or audio) to Supabase Storage
 * @param {Buffer} buffer - The data to upload
 * @param {string} folder - Folder path inside the bucket
 * @param {string} fileName - Base file name
 * @param {string} extension - File extension (e.g., 'png', 'wav')
 * @param {string} bucket - Supabase storage bucket name
 * @returns {Promise<string>} Public URL of uploaded file
 * @throws {Error} If upload fails
 */
    async uploadToSupabase(buffer, folder, fileName, extension, bucket) {
        const filePath = `${folder}/${fileName}_${Date.now()}.${extension}`;

        const { error } = await supabase.storage
            .from(bucket)
            .upload(filePath, buffer, {
                contentType: `${extension === "wav" ? "audio/wav" : "image/" + extension}`,
                upsert: true,
            });

        if (error) throw new Error("Upload failed: " + error.message);

        const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
        return data.publicUrl;
    }
    /**
        * Uploads audio buffer to Supabase TTS folder
        * @param {Buffer} audioBuffer
        * @param {string} fileName
        * @returns {Promise<string>} Public URL
        */
    async uploadAudioToSupabase(audioBuffer, fileName) {
        return this.uploadToSupabase(audioBuffer, "tts", fileName, "wav", "audio-files");
    }
    /**
      * Uploads audio buffer to Supabase TTS folder
      * @param {Buffer} imageBuffer
      * @param {string} fileName
      * @returns {Promise<string>} Public URL
      */
    async uploadImageToSupabase(imageBuffer, fileName, extension = "png") {
        return this.uploadToSupabase(imageBuffer, "images", fileName, extension, "image-files");
    }

    /**
 * Generates images for multiple prompts and optionally uploads them
 * @param {Object.<string, string>} prompts - Mapping of style → prompt text
 * @param {string} [model="gemini-2.0-flash-preview-image-generation"] - Gemini AI image model
 * @param {boolean} [upload=true] - Whether to upload generated images to Supabase
 * @returns {Promise<Object.<string, string>>} Mapping of style → uploaded image URL
 */
    async generateImages(prompts, model = "gemini-2.0-flash-preview-image-generation", upload = true) {
        const results = {};
        try {
            for (const [style, prompt] of Object.entries(prompts)) {
                const imageModel = this.genAI.getGenerativeModel({ model });
                const result = await imageModel.generateContent({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { responseModalities: ["IMAGE", "TEXT"] },
                });

                const base64Data = result.response?.candidates?.[0]?.content?.parts?.find(
                    (p) => p.inlineData?.mimeType?.startsWith("image/")
                )?.inlineData?.data;

                if (!base64Data) {
                    console.warn(`⚠️ No image data returned for style "${style}"`);
                    continue;
                }

                const buffer = Buffer.from(base64Data, "base64");
                let url = null;
                if (upload) {
                    url = await this.uploadImageToSupabase(buffer, style);
                }

                // // Store only the URL
                results[style] = url;
            }
        } catch (err) {
            console.error("❌ Error generating images:", err.message);
        }
        return results;
    }

    /**
     * Generates a single image using Gemini and returns base64 data URI
     * @param {string} imagePrompt - Prompt text for image generation
     * @param {string} [model="gemini-2.0-flash-preview-image-generation"] - Gemini AI image model
     * @returns {Promise<string|null>} Base64 data URI of generated image
     */
    async generateSingleImage(imagePrompt, model = "gemini-2.0-flash-preview-image-generation", upload = true) {
        try {
            const imageModel = this.genText.getGenerativeModel({ model });

            const result = await imageModel.generateContent({
                contents: [{ parts: [{ text: imagePrompt }] }],
                generationConfig: { responseModalities: ["IMAGE", "TEXT"] },
            });

            const base64Data = result.response?.candidates?.[0]?.content?.parts?.find(
                (p) => p.inlineData?.mimeType?.startsWith("image/")
            )?.inlineData?.data;

            if (!base64Data) {
                console.warn(`⚠️ No image data returned for prompt: "${imagePrompt}"`);
                return null;
            }
            const buffer = Buffer.from(base64Data, "base64");
            const filename = imagePrompt.split(" ").slice(0, 7).join("_").replace(/[^a-zA-Z0-9_-]/g, "");;
            let url = null;
            if (upload) {
                url = await this.uploadImageToSupabase(buffer, filename);
            }
            // return {
            //     imagePrompt, // Original prompt
            //     url,         // Public URL of the uploaded image
            //     filename     // Meaningful filename}
            // };
            return url;
        } catch (err) {
            console.error("❌ Error generating image:", err.message);
            return null;
        }
    }

    /**
     * Generates TTS audio for a given text and uploads it to Supabase
     * @param {string} text - Text to convert to speech
     * @param {string} [voiceName="Kore"] - Prebuilt Gemini voice
     * @param {string} [model="gemini-2.5-flash-preview-tts"] - TTS model
     * @returns {Promise<string|null>} Public URL of generated audio
     */
    async textToSpeech(text, voiceName = "Kore", model = "gemini-2.5-flash-preview-tts") {
        try {
            const ttsModel = this.genaudio.getGenerativeModel({ model });
            const chunkSize = 200;
            const chunks = [];

            for (let i = 0; i < text.length; i += chunkSize) {
                chunks.push(text.slice(i, i + chunkSize));
            }

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

            if (!pcmBuffers.length) throw new Error("No audio data returned from API");

            const fullPcmBuffer = Buffer.concat(pcmBuffers);

            const wavBuffer = await new Promise((resolve, reject) => {
                const writer = new wav.Writer({ channels: 1, sampleRate: 24000, bitDepth: 16 });
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
                writer.end(fullPcmBuffer);
            });

            const url = await this.uploadAudioToSupabase(wavBuffer, "generated_audio");
            return url;
        } catch (err) {
            console.error("❌ Error generating audio:", err.message);
            return null;
        }
    }

    /**
 * Generates two scripts for a 30-second video
 * @param {string} promptText - User prompt for script generation
 * @param {string} [model="gemini-2.0-flash"] - Gemini AI chat model
 * @returns {Promise<string|null>} JSON string of generated scripts
 */
    async generateScript(promptText, model = "gemini-2.0-flash") {
        try {
            const chatModel = this.genAI.getGenerativeModel({ model });
            const generationConfig = {
                temperature: 1,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192,
                responseMimeType: "application/json",
            };

            const createScript = chatModel.startChat({
                generationConfig,
                history: [
                    {
                        role: "user",
                        parts: [{ text: "write a two different scripts for 30 seconds video" }],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: '```json\n[\n  {\ "scripts": [ { "context":"Once upon a time, in a faraway land, there lived a brave knight named Sir Lancelot..." }, { "context":"(Upbeat music starts) A bustling city street at dawn..." }]\n  },\n  }\n]\n```',
                            },
                        ],
                    },
                ],
            });

            const res = await createScript.sendMessage(promptText);
            return res?.response?.text();
        } catch (err) {
            console.error("❌ Error generating script:", err.message);
            return null;
        }
    }

    /**
* Generates two scripts for a 30-second video
* @param {string} promptText - User prompt for script generation
* @param {string} [model="gemini-2.0-flash"] - Gemini AI chat model
* @returns {Promise<string|null>} JSON string of generated imageprompts
*/
    async generateImagePrompts(promptText, model = "gemini-2.0-flash") {
        try {
            const chatModel = this.genAI.getGenerativeModel({ model });
            const generationConfig = {
                temperature: 1,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192,
                responseMimeType: "application/json",
            };

            const createScript = chatModel.startChat({
                generationConfig,
                history: [
                    {
                        role: "user",
                        parts: [{ text: "Generate image prompts for a 30-second video based on the script:  \"Once upon a time, in a magical forest, a small fox decided to explore beyond its home. Along the way, it met a wise owl who guided it through sparkling waterfalls and glowing meadows.\" in \"cartoon fantasy\" style.   - Break the script into scenes.   - For each scene, create a detailed image description including colors, atmosphere, characters, and objects.   - Do NOT include camera angles or technical photography terms.   - Return the result in JSON following this schema:  [   {     \"imagePrompt\": \"<Detailed image description for this scene including cartoon fantasy style>\",     \"sceneContent\": \"<Exact script content of this scene>\"   } ]  - Make sure each scene’s prompt is vivid, descriptive, and matches the story line.   - Only return the JSON array, nothing else." }],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: '```json\n[\n  {\n    "imagePrompt": "A vibrant, cartoon-style forest at the first light of dawn. A small, fluffy fox with bright orange fur and white-tipped paws peeks out from a cozy burrow, surrounded by colorful wildflowers and oversized mushrooms. The air sparkles with magical dust particles.",\n    "sceneContent": "Once upon a time, in a magical forest, a small fox decided to explore beyond its home."\n  },\n  {\n    "imagePrompt": "The little fox walks along a winding path of moss-covered stones, lined with whimsical trees that have glowing leaves. Colorful butterflies with patterned wings flutter by in the air, and the scene has a peaceful and wondrous feeling.",\n    "sceneContent": "Along the way, it met a wise owl"\n  },\n  {\n    "imagePrompt": "The small fox gazes in amazement at a wise owl perched on an old tree branch. The owl is covered in brown and cream feathers, has large, golden twinkling eyes, and has a gentle expression.",\n    "sceneContent": "who guided it through sparkling waterfalls"\n  },\n  {\n    "imagePrompt": "The wise owl guides the little fox toward a beautiful waterfall that falls over glowing, crystal-like rocks into a clean, turquoise lake. Rainbows can be seen in the mist that rises from the waterfall, and there are magical flowers growing beside the water.",\n    "sceneContent": "and glowing meadows."\n  },\n  {\n    "imagePrompt": "In a broad meadow illuminated by soft, warm light, the wise owl and little fox walk side by side across luminous grass. Fireflies dance in the air, glittering. Whimsical mushroom-shaped homes shine gently in the distance beneath a sky filled with stars.",\n    "sceneContent": ""\n  }\n]\n```',
                            },
                        ],
                    },
                ],
            });
            const res = await createScript.sendMessage(promptText);
            const response = JSON.parse(res?.response?.text());
            return response;
        } catch (err) {
            console.error("❌ Error generating image prompts:", err.message);
            return null;
        }
    }

    /**
   * Transcribes audio from a remote URL using Deepgram
   * @param {string} url - Public audio URL
   * @returns {Promise<Object>} Transcription result or error object
   */
    async transcribeUrl(url, model = "nova-3") {
        try {
            const { result } = await deepgram.listen.prerecorded.transcribeUrl(
                {
                    url: url,
                },
                {
                    model: model,
                    // smart_format: true,
                }
            );
            // Use optional chaining with results path
            const words = result?.results?.channels?.[0]?.alternatives?.[0]?.words;

            if (!words) {
                console.warn("⚠️ No words found in transcription response");
            }

            return words ?? [];
        } catch (err) {
            console.error("❌ Error transcribing audio:", err.message);
            return { error: err.message || err };
        }
    }
}


export const apiClient = APIClient.getInstance();