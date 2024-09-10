import { landing } from "@/config/data/landing";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { landingslug: string } }
) {
  try {
    const result = landing.find((item) => item.slug === params.landingslug);

    return NextResponse.json({ message: result, status: 200, });
  } catch (error) {
    console.error("Error in POST /api/inquiry:", error);
    return NextResponse.json(
      { error: "Failed to create resource." },
      { status: 500 }
    );
  }
}
