// src/lib/chunking.ts
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});



export async function chunkContent(content: string) {
  const text = content.trim();

  if (!text) return [];

  return textSplitter.splitText(text);
}