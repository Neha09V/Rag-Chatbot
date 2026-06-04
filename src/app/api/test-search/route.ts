import { webSearch } from "@/lib/web-search";

export async function GET() {
  try {
    const result = await webSearch("IPL 2025 winner");

    return Response.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      error: String(error),
    });
  }
}