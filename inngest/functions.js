import { apiClient } from "@/lib/Client";
import { inngest } from "./client";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const ImagePromptScript = `Generate Image prompt of {style} style with all details for each  scene for the 30 seconds video: script: {script}
- Just Give specific image prompts depends on the story line
- Donot give camera angle image prompt
- Follow the following schema and returns JSON data
-[
    {
    imagePrompt:"",
    sceneContent:'<Script Content>
    }
]`;

export const helloWorld = inngest.createFunction(
    { name: "Hello World" },
    { event: "app/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "10s");
        return { message: `Hello ${event.data.email}!` };
    }
);

export const GenerateVideoData = inngest.createFunction(
    { id: "generate-video-data" },
    { event: "generate-video-data" },
    async ({ event, step }) => {
        const { script, topic, title, captionStyle, videoStyle, voice, recordId } = event?.data;

        const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

        // Generate Audio File in MP3 format
        const GenerateAudioFile = await step.run(
            "GenerateAudioFile",
            async () => {
                const audioGeneration = await apiClient.textToSpeech(script, voice);
                console.log("Generated Audio:", audioGeneration);
                if (!audioGeneration) throw new Error("Audio generation failed. Please try again later.");
                return audioGeneration; // Returns audio file data or URL
            }
        );

        // TODO: Generate captions
        const GenerateCaptions = await step.run(
            "GenerateCaptions",
            async () => {
                const generateCaptions = await apiClient.transcribeUrl(GenerateAudioFile);
                console.log("Generated Captions:", generateCaptions);
                if (!generateCaptions) throw new Error("Caption generation failed. Please try again later.");
                return generateCaptions; // Returns captions
            }
        )
        // TODO: Generate image prompts from scripts
        const GenerateImagePrompts = await step.run(
            "GenerateImagePrompts",
            async () => {
                const PROMPT = ImagePromptScript.replace("{script}", script).replace("{style}", videoStyle);
                const imagePrompts = await apiClient.generateImagePrompts(PROMPT);
                if (!imagePrompts || imagePrompts.length === 0) throw new Error("Image prompt generation failed.");
                console.log("Generated Image Prompts:", imagePrompts);
                return imagePrompts; // Returns image prompts
            }
        )

        // // TODO: Generate images using AI
        const GenerateImages = await step.run(
            "GenerateImagesFromImagePrompts",
            async () => {
                // Generate all images concurrently
                const images = await Promise.all(
                    GenerateImagePrompts.map(async (item) => {
                        const img = await apiClient.generateSingleImage(item.imagePrompt);
                        if (!img) throw new Error("Image generation failed for one scene.");
                        return img;
                    })
                );
                console.log("Generated Images:", images);
                return images;
            }
        )
        // const BASE_URL = 'https://aigurulab.tech';

        // // Replace your step function with this
        // const GenerateImages = await step.run(
        //     "GenerateImagesFromImagePrompts",
        //     async () => {
        //         // Generate all images concurrently
        //         const images = await Promise.all(
        //             GenerateImagePrompts.map(async (item) => {
        //                 try {
        //                     const result = await axios.post(
        //                         BASE_URL + '/api/generate-image',
        //                         {
        //                             width: 1024,
        //                             height: 1024,
        //                             input: item.imagePrompt,
        //                             model: 'sdxl', // or 'flux'
        //                             aspectRatio: "1:1", // Only for Flux model
        //                         },
        //                         {
        //                             headers: {
        //                                 'x-api-key': "5aab654c-2d33-4952-a416-acd7f96be99d",
        //                                 'Content-Type': 'application/json',
        //                             },
        //                         }
        //                     );

        //                     if (!result?.data?.image) throw new Error("Image generation failed.");
        //                     return result.data.image; // Base64 image
        //                 } catch (err) {
        //                     console.error("Error generating image for prompt:", item.imagePrompt, err);
        //                     throw err;
        //                 }
        //             })
        //         );

        //         console.log("Generated Images:", images);
        //         return images;
        //     }
        // );

        // TODO: Save all data to DB
        const UpdateDB = await step.run(
            "UpdateDB",
            async () => {
                // TODO: Update DB with all generated content
                const result = await convex.mutation(api.videoData.UpdateVideoRecord, {
                    recordId: recordId,
                    audioUrl: GenerateAudioFile,
                    captionJson: GenerateCaptions,
                    images: GenerateImages,
                });
                console.log(result);
                // if (!result) throw new Error("DB update failed.");

                return result;
            }
        )

        return { status: "success", message: "Executed and Updated successfully" };
    }
);
