import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
  const { feedback, idea } = await req.json();

  const format = {
    rating: 0,
    feedback: [
      "Provide specific feedback to improve the idea. Offer constructive suggestions.",
      "Address potential shortcomings or areas for improvement.",
      "Highlight the idea's strengths and weaknesses.",
      "Ensure that the feedback is insightful and directly related to the idea.",
      "If the idea is innovative, emphasize its uniqueness and potential.",
    ],
  };

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: "You are assisting with idea rating and feedback.",
      },
      {
        role: "user",
        content: `Rate the following idea on a scale from 1 to 10, with 1 being the least favorable and 10 being the most favorable. Additionally, provide specific, ${feedback} feedback to enhance the strengths of the idea. Your feedback should be insightful and directly related to the idea. The idea is as follows:

        ${idea}
        
        Please strictly follow the JSON format for feedback:
        ${JSON.stringify(format, null, 2)}
        
        Additionally, make sure the generated rating and feedback are concise and informative, each less than 600 characters. If the idea is innovative, ensure that the feedback reflects its uniqueness and potential.
        `,
      },
    ],
  });

  // const prompt = `Rate the following ${idea} on a scale from 1 to 10, with 1 being poor and 10 being excellent. Provide ${feedback} feedback to help improve the idea. Business ideagraphies with no hashtags and clearly labeled "1." and "2.". ${
  //   feedback === "Innovative"
  //     ? "Make sure there is a innovative idea in there and it's a little unique."
  //     : null
  // }
  //     Make sure each generated ideagraphy is less than 160 characters, has short sentences that are found in Buisness ideas, and base them on this context: ${idea}${
  //   idea.slice(-1) === "." ? "" : "."
  // }`;

  //   const prompt = `instructions: Please rate the idea "${idea}" on a scale from 1 to 10, with 1 being the least favorable and 10 being the most favorable. Additionally, provide specific, actionable feedback to enhance the strengths of the idea. Your feedback "${feedback}" should be insightful and directly related to the idea.
  //     rating: /10
  //     feedback: 1: , 2: , 3: , 4: , 5:
  //     `;

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
