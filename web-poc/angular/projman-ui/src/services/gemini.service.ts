import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Injectable({ providedIn: 'root' })
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // API_KEY is guaranteed to be in the environment per instructions
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text || 'No response generated.';
    } catch (error) {
      console.error('Gemini API Error:', error);
      return 'Sorry, something went wrong while communicating with the AI.';
    }
  }
}