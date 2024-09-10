import { createInquiry, getInquiries } from "@/lib/actions/inquiry";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await createInquiry(body);

    return NextResponse.json({ message: result });
  } catch (error) {
    console.error("Error in POST /api/inquiry:", error);
    return NextResponse.json({ error: "Failed to create resource." }, { status: 500 });
  }
}


export async function GET(req: Request) {
  try {
    const result = await getInquiries();

    return NextResponse.json({ message: result });
  } catch (error) {
    console.error("Error in POST /api/inquiry:", error);
    return NextResponse.json({ error: "Failed to create resource." }, { status: 500 });
  }
}