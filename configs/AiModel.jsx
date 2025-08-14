import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const generateScript = model.startChat({
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
          text: '```json\n[\n  {\ "scripts": [ { "context":"Once upon a time, in a faraway land, there lived a brave knight named Sir Lancelot. He was known for his valor and his unwavering loyalty to his king. One day, Sir Lancelot embarked on a perilous quest to retrieve the Holy Grail. He journeyed through treacherous forests, battled fierce dragons, and overcame seemingly insurmountable obstacles. With his trusty sword in hand, he faced the challenges head-on." }, { "context":"(Upbeat music starts) A bustling city street at dawn. A barista is expertly crafting a latte, a runner is jogging past a park, and a subway train is pulling into a station. A young professional checks their phone, a smile on their face. (Fast cuts of people laughing, friends eating at a cafe, a skateboarder doing a trick). The screen fades to black with the text: \'Live your story.\'" }]\n  },\n  }\n]\n```',
        },
      ],
    },
  ],
});
