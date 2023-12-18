import { NextRequest, NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const runtime = "edge";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { input } = await req.json();
    const prompt = `You are a Brand and Business Speacailist This is my idea ${input} and suggest me 10 name for my startup that should be innovative and unique`;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.error();
  }
}
