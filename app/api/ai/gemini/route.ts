import { NextRequest, NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const runtime = "edge";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { input } = await req.json();

    const prompt = `
      As a Brand and Business Specialist, I'm seeking innovative and unique names for a startup. 
      Here's my idea: ${input}. 
      Please provide 10 startup names along with brief descriptions, following this strict structure:
      
      {
        "names": [
          {"name": "Name1", "description": "Description1"},
          {"name": "Name2", "description": "Description2"},
          // ... continue for a total of 10 names
        ]
      }
      
      Ensure the names are creative and distinctive. Your suggestions will play a crucial role in shaping the identity of the startup.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    console.log(text);

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.error();
  }
}