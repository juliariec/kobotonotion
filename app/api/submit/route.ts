import exportHighlights from "@/lib/exportHighlights";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type");

  if (!contentType || !contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Content-Type must be multipart/form-data" },
      { status: 400 }
    );
  }

  try {
    if (!req.body) {
      return NextResponse.json(
        { error: "No body in request" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const integrationToken = formData.get("token") as string;
    const databaseId = formData.get("dbid") as string;
    const databaseFile = formData.get("file") as File | null;

    if (!databaseFile) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const results = await exportHighlights(
      integrationToken,
      databaseId,
      databaseFile
    );
    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ results: [] });
  }
}
