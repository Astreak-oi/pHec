import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";
// import { LangChainAdapter } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
  });

  

  const joke = z.object({
    setup: z.string().describe("The setup of the joke"),
    punchline: z.string().describe("The punchline to the joke"),
    rating: z
      .number()
      .optional()
      .describe("How funny the joke is, from 1 to 10"),
  });

  const structuredLlm = model.withStructuredOutput(joke);

  await structuredLlm.invoke(prompt);

  
  const parser = new StringOutputParser();

  const stream = await model.pipe(parser).stream(prompt);

  return LangC.toDataStreamResponse(stream);
}
