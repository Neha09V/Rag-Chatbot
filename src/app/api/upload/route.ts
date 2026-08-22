import { NextResponse } from "next/server";
import pdf from "pdf-parse";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("pdf") as File;

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "No PDF file uploaded",
        },
        { status: 400 }
      );
    }

    // 10 MB limit
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "PDF size must be less than 10 MB",
        },
        { status: 400 }
      );
    }

    console.log("PDF received:", file.name);
    console.log("PDF size:", file.size);

    // Convert PDF to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Extract text from PDF
    const data = await pdf(buffer);

    if (!data.text || data.text.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No text found in PDF",
        },
        { status: 400 }
      );
    }

    console.log("PDF text extracted");

    // Split text into chunks
    const chunks = await chunkContent(data.text);

    if (chunks.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No valid chunks generated",
        },
        { status: 400 }
      );
    }

    console.log("Chunks created:", chunks.length);

    // Generate embeddings
    const embeddings = await generateEmbeddings(chunks);

    console.log("Embeddings generated");

    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index],
    }));

    // Store in database
    await db.delete(documents);
    await db.insert(documents).values(records);

    console.log("Documents inserted:", records.length);

    return NextResponse.json({
      success: true,
      message: `Successfully indexed ${records.length} chunks`,
    });
  } catch (error) {
    console.error("PDF processing error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to process PDF",
      },
      { status: 500 }
    );
  }
}