// src/app/api/chat/route.ts

import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  InferUITools,
  UIDataTypes,
  stepCountIs,
} from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { webSearch } from "@/lib/web-search";
import { searchDocuments } from "@/lib/search";

const tools = {
  searchKnowledgeBase: tool({
    description: `
Search information from uploaded PDF documents and Knowledge Base.

Use this tool whenever the answer may exist in uploaded PDFs.
- The user asks about uploaded documents.
- The user asks questions likely answered by uploaded PDFs.
- The user refers to document content, notes, books, reports, manuals, or files.

DO NOT use this tool for:
- General knowledge questions.
- Current events.
- Sports results.
- Programming questions not related to uploaded documents.
- Common educational topics.
- Questions that can be answered using general knowledge.
`,
    inputSchema: z.object({
      query: z.string().describe("The search query to find relevant documents"),
    }),
    execute: async ({ query }) => {
      try {
        // Search the vector database
        console.log("KNOWLEDGE SEARCH CALLED:", query);

const results = await searchDocuments(query, 5, 0.3);

console.log("SEARCH RESULTS:", results);

        if (results.length === 0) {
          return "No_Relevant_Documents_Found";
        }

        // Format results for the AI
        const formattedResults = results
          .map((r: any, i: number) => `[${i + 1}] ${r.content}`)
          .join("\n\n");

        return formattedResults;
      } catch (error) {
        console.error("Search error:", error);
        return "Error searching the knowledge base.";
      }
    },
  }),
  webSearch: tool({
    description:`Search the internet for current information, news, sports,
recent events, latest technologies, prices, trends, and facts
that may not exist in uploaded documents.`,
    inputSchema: z.object({
      query: z.string().describe("The search query to find relevant information"),
    }),
   execute: async ({ query }) => {
  console.log("WEB SEARCH CALLED:", query);

  try {
    const result = await webSearch(query);
       const cleanedResult = result
      .replace(/\\<br\s*\/?>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n");

    return cleanedResult;
  
  } catch (error) {
    console.error("Web search error:", error);
    return "WEB_SEARCH_FAILED";
  }
},    
  }),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    const trimmedMessages = messages.slice(-4);
    const result = streamText({
      model: groq("openai/gpt-oss-20b"),
  
      messages: await convertToModelMessages(trimmedMessages),
      tools,
system: `
You are an AI assistant with 3 modes:

1. searchKnowledgeBase (PDFs)
2. webSearch (real-time internet)
3. your own knowledge

━━━━━━━━━━━━━━━━━━━━━━━
TOOL USAGE RULES (VERY IMPORTANT)
━━━━━━━━━━━━━━━━━━━━━━━

ALWAYS follow these rules:

A) If question is about:
- current events
- news
- sports results (IPL, cricket, etc.)
- recent facts
→ MUST use webSearch tool

B) If question is about:
- uploaded PDF / documents
→ MUST use searchKnowledgeBase tool

C) If question is general knowledge:
→ answer directly ONLY if no tool is needed

━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL RULE
━━━━━━━━━━━━━━━━━━━━━━━

If user asks anything about:
- IPL winners
- cricket results and Details
- current year events
- latest information
-political news and history

YOU MUST ALWAYS CALL webSearch BEFORE ANSWERING.
NEVER answer from memory.

━━━━━━━━━━━━━━━━━━━━━━━

Response Format:
- Use Markdown
- Be structured
- Be short and clear
- Never output HTML tags such as <br>, <br/>, <p>, <div>, or <table>
- Use Markdown line breaks instead of HTML tags

`,  
      stopWhen: stepCountIs(2),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}