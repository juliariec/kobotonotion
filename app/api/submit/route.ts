import exportHighlights from "@/lib/exportHighlights";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      integrationToken,
      databaseId,
      sqliteFile: databaseFile,
    } = await req.json();
    const results = await exportHighlights(
      databaseId,
      integrationToken,
      databaseFile
    );
    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
