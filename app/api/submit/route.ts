import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { integrationToken, databaseId, sqliteFile } = await req.json();

    const results = [
      { id: "1", status: "success" },
      { id: "2", status: "error" },
      { id: "3", status: "success" },
    ];

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
