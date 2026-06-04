import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbedding } from "./embeddings";
import { cosineDistance, desc, sql } from "drizzle-orm";

export async function findRelevantContent(query: string) {
  const embedding = await generateEmbedding(query);

  const similarity = sql<number>`
    1 - (${cosineDistance(
      documents.embedding,
      embedding
    )})
  `;

  const results = await db
    .select({
      content: documents.content,
      similarity,
    })
    .from(documents)
    .orderBy(desc(similarity))
    .limit(5);

  return results;
}