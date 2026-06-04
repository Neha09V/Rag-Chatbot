// src/lib/web-search.ts

import { tavily } from "@tavily/core";

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});

export async function webSearch(query: string) {
  const response = await tvly.search(query, {
    maxResults: 5,
  });

  return response.results
    .map(
      (r: {
        title?: string;
        content?: string;
      }) => `${r.title ?? ""}\n${r.content ?? ""}`
    )
    .join("\n\n");
}