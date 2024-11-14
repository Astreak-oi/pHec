import { NextRequest, NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const runtime = "edge";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { input, industry, audience, vision, personality, themes, competitors, nameLength } = await req.json();

    const prompt = `
    As a Brand and Business Specialist, I'm seeking innovative and unique names for a startup.
    Here are some details to guide your suggestions:
    
    - **Startup Idea**: ${input}
    - **Industry/Field**: ${industry || "All Industries"}
    - **Target Audience**: ${audience || "All Audiences"}
    - **Vision/Mission**: ${vision || "All Focuses"}
    - **Brand Personality**: ${personality || "Flexible"} 
    - **Preferred Themes/Keywords**: ${themes || "All Themes"} 
    - **Competitors**: ${competitors || "No Specific Competitors"} 
    - **Name Length**: ${nameLength || "1 to 5"} 
    
    Based on the information provided, please suggest 10 startup names along with brief descriptions. Ensure the names are creative, distinctive, and align with the specified details. Use the following structure:
    
    {
      "names": [
        {"name": "Name1", "description": "Description1"},
        {"name": "Name2", "description": "Description2"},
        // ... continue for a total of 10 names
      ]
    }
    
    Your suggestions will play a crucial role in shaping the identity of the startup. Make sure the names reflect the brand's essence and stand out in the industry.
  `;
  
  
      // const prompt = `
    //   As a Brand and Business Specialist, I'm seeking innovative and unique names for a startup. 
    //   Here's my idea: ${input}. 
    //   Please provide 10 startup names along with brief descriptions, following this strict structure:
      
    //   {
    //     "names": [
    //       {"name": "Name1", "description": "Description1"},
    //       {"name": "Name2", "description": "Description2"},
    //       // ... continue for a total of 10 names
    //     ]
    //   }
      
    //   Ensure the names are creative and distinctive. Your suggestions will play a crucial role in shaping the identity of the startup.
    // `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.error();
  }
}