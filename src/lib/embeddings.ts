// // src/lib/embeddings.ts
// import { embed,embedMany} from "ai";
// import { google } from "@ai-sdk/google";

// export async function generateEmbedding(text: string): Promise<number[]> {
//   const input = text.replaceAll("\n", " ");

//   const { embedding } = await embed({
//     model: google.textEmbeddingModel("gemini-embedding-001"),
//     value: input,
//   });
// console.log(embedding.length);
//   return embedding;
// }

// export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
//   const inputs = texts.map((text) => text.replaceAll("\n", " "));

//   const { embeddings } = await embedMany({
//     model: google.textEmbeddingModel("gemini-embedding-001"),
//     values: inputs,
//   });

//   return embeddings;
//  }

// src/lib/embeddings.ts

import { embed, embedMany } from "ai";
import { google } from "@ai-sdk/google";

export async function generateEmbedding(
  text: string
): Promise<number[]> {
  const input = text.replaceAll("\n", " ");

  const { embedding } = await embed({
    model: google.textEmbeddingModel("gemini-embedding-001"),
    value: input,
  });

  console.log("Embedding dimension:", embedding.length);

  return embedding;
}

export async function generateEmbeddings(
  texts: string[]
): Promise<number[][]> {
  const inputs = texts.map((text) =>
    text.replaceAll("\n", " ")
  );

  const batchSize = 100;
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < inputs.length; i += batchSize) {
    const batch = inputs.slice(i, i + batchSize);

    const { embeddings } = await embedMany({
      model: google.textEmbeddingModel("gemini-embedding-001"),
      values: batch,
    });

    allEmbeddings.push(...embeddings);
  }

  return allEmbeddings;
}








