
import { GoogleGenAI } from "@google/genai";
import { Tone } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async polishContent(rawText: string, tone: Tone): Promise<string> {
    const systemInstruction = `
      You are an expert content strategist and copywriter. 
      Your task is to transform raw, messy, or unstructured user thoughts into professional-grade content.
      
      The requested tone is: ${tone}.
      
      Guidelines:
      1. If the tone is 'Professional', focus on clarity, industry terminology, and formal structure.
      2. If 'Viral', use hooks, bullet points, and high-impact emotional language.
      3. If 'Academic', prioritize citations-like logic, dense informational value, and precise vocabulary.
      4. If 'Casual', use conversational language, emojis where appropriate, and a friendly vibe.
      5. If 'Creative', use metaphors, storytelling, and an artistic flair.

      Return ONLY the polished content. Do not add explanations or meta-commentary.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: rawText,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      return response.text || "Failed to generate content.";
    } catch (error) {
      console.error("Gemini Error:", error);
      throw new Error("The AI service is currently unavailable. Please try again later.");
    }
  }

  async *polishContentStream(rawText: string, tone: Tone) {
    const systemInstruction = `
      You are an expert content strategist. Polish this thought into a ${tone} format.
      Return only the result.
    `;

    try {
      const result = await this.ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: rawText,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      for await (const chunk of result) {
        yield chunk.text;
      }
    } catch (error) {
      console.error("Gemini Stream Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
