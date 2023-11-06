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
      "Deliver a comprehensive assessment, pinpointing areas for improvement and providing solutions to enhance the idea.",
      "Identify any possible weaknesses or pitfalls that the idea may face, suggesting strategies to overcome them.",
      "Examine the proposition's strengths and its potential areas of weakness, providing balanced criticism.",
      "Ensure your feedback is rich in insight, completely focused on the idea, and helpful to the idea's growth.",
      "If the idea is original and groundbreaking, accentuate its distinctiveness and the opportunities it presents.",
    ],
  };

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: "You are a reviewer specializing in generating idea ratings and feedback.",
      },
      {
        role: "user",
        content: `Please review the following idea. Rate it from 1 to 10, with 1 indicating low approval and 10 indicating high approval. In addition, deliver a thorough and ${feedback} constructive critique to further fortify the idea's strengths. Ensure your feedback is insightful and directly addressing the mentioned idea. The idea is as follows:

        ${idea}
        
        Be sure to maintain the JSON format for feedback as shown below:
        ${JSON.stringify(format, null, 2)}
        
        Also, it's crucial that the generated rating and feedback remain succinct and informative, keeping each below 600 characters. Should the idea prove innovative, ensure that the feedback accentuates its unique qualities and vast potential.
        `,
      },
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
