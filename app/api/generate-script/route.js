import { apiClient } from "@/lib/Client";
import { NextResponse } from "next/server";


const SCRIPT_PROMPT = `write a two different scripts for 30 seconds video on Topic:{topic},
Do not add Scene description
Dont Add Anything in Braces, Just return the plain story in text
Give me the response in JSON format and follow the schema
-{
   scripts: [
     {
       "context": ""
     },
   ],
}`;

export async function POST(req) {
  const { topic } = await req.json();
  const PROMPT = SCRIPT_PROMPT.replace("{topic}", topic);
  const result = await apiClient.generateScript(PROMPT);
  return NextResponse.json(JSON.parse(result));
}
