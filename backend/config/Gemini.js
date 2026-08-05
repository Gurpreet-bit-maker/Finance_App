import { GoogleGenAI } from "@google/genai";
console.log("working gen");
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
