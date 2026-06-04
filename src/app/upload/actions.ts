// "use server";

// import pdf  from "pdf-parse";
// import {db} from "@/lib/db-config";
// import {documents} from "@/lib/db-schema";
// import{generateEmbeddings} from "@/lib/embeddings";
// import {chunkContent} from "@/lib/chunking";


// export async function processPdfFile(formData: FormData) {
 
//   try{
//  const file = formData.get("pdf") as File ;
//  if (!file || !(file instanceof File)) {
//   return {
//     success: false,
//     message: "No PDF file uploaded.",
//   };
// }

// // const pdfModule = await import("pdf-parse");

// // const pdf = pdfModule.default || pdfModule;
//  const bytes = await file.arrayBuffer();
//  const buffer = Buffer.from(bytes);
//  const data = await pdf(buffer);
// //  const content = data.text;

//   if(!data.text || data.text.trim().length ===0 ){
//     return {
//         success: false,
//         message: "The uploaded PDF file does not contain any text. Please upload a valid PDF file with text content.",   
//     };
//   }
//   const chunks =await chunkContent(data.text);
//   const embeddings = await generateEmbeddings(chunks);
//   const records = chunks.map((chunk, index) => ({
//     content: chunk,
//     embedding: embeddings[index],
//   }));
//   await db.insert(documents).values(records);
//   return {
//     success: true,
//     message: `Created ${records.length} records successfully!`,
//   };
//     }   

//   catch  (error){
//     console.error("Error processing PDF file:", error);
//     return {
//         success: false,
//         message: "Failed to process PDF file. Please try again.",   
//     };
//     }

  





// }







// // src/app/upload/actions.ts

// // import pdf from "pdf-parse";
// import  pdf from "pdf-parse";
// import { db } from "@/lib/db-config";
// import { documents } from "@/lib/db-schema";
// import { generateEmbeddings } from "@/lib/embeddings";
// import { chunkContent } from "@/lib/chunking";

// export async function processPdfFile(formData: FormData) {
//   try {
//     const file = formData.get("pdf") as File;
//     if (!file || !(file instanceof File)) {
//       return {
//         success: false,
//         error: "No PDF file uploaded",
//       };
//     }

//     console.log("pdf =", pdf);
// console.log("typeof pdf =", typeof pdf);

//     // Convert File to Buffer and extract text
//     // const pdf = require("pdf-parse");
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
// // Handle both ESM and CommonJS exports            
//     const data = await pdf(buffer);

//     if (!data.text || data.text.trim().length === 0) {
//       return {
//         success: false,
//         error: "No text found in PDF",
//       };
//     }

//     // Chunk the text
//     const chunks = await chunkContent(data.text);

//     // Generate embeddings
//     const embeddings = await generateEmbeddings(chunks);

//     // Store in database
//     const records = chunks.map((chunk, index) => ({
//       content: chunk,
//       embedding: embeddings[index],
//     }));

//     await db.insert(documents).values(records);

//     return {
//       success: true,
//       message: `Created ${records.length} searchable chunks`,
//     };
//   } catch (error) {
//     console.error("PDF processing error:", error);
//     return {
//       success: false,
//       error: "Failed to process PDF",
//     };
//   }
// }



"use server";

import pdf from "pdf-parse";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

export async function processPdfFile(formData: FormData) {
  try {
    const file = formData.get("pdf") as File;

    if (!file || !(file instanceof File)) {
      return {
        success: false,
        error: "No PDF file uploaded",
      };
    }

    // Optional: Limit file size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      return {
        success: false,
        error: "PDF size must be less than 10 MB",
      };
    }

    // Convert uploaded file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Extract text from PDF
    const data = await pdf(buffer);

    if (!data.text || data.text.trim().length === 0) {
      return {
        success: false,
        error: "No text found in PDF",
      };
    }

    

    // Split text into chunks
    const chunks = await chunkContent(data.text);

  

    if (chunks.length === 0) {
      return {
        success: false,
        error: "No valid chunks generated",
      };
    }

    // Generate embeddings
    const embeddings = await generateEmbeddings(chunks);

    

    // Prepare records for insertion
    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index],
    }));

    

    // Insert into Neon/Postgres
    await db.delete(documents);
await db.insert(documents).values(records);

    return {
      success: true,
      message: `Successfully indexed ${records.length} chunks`,
    };
  } catch (error) {
    console.error("PDF processing error:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to process PDF",
    };
  }
}