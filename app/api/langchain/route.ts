// import { NextRequest } from 'next/server';
// import {  StreamingTextResponse } from 'ai';
 
// import { ChatOpenAI } from 'langchain/chat_models/openai';
// import { BytesOutputParser } from 'langchain/schema/output_parser';
// import { PromptTemplate } from 'langchain/prompts';
 
// export const runtime = 'edge';
 
// /**
//  * Basic memory formatter that stringifies and passes
//  * message history directly into the model.

//   * @param message
//   */
// function formatMessage(message: VercelChatMessage) {
//   return JSON.stringify(message);
// }


 
// /*
//  * This handler initializes and calls a simple chain with a prompt,
//  * chat model, and output parser. See the docs for more information:
//  *
//  * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
//  */
// export async function POST(req: Request) {
//   const { feedback, idea } = await req.json();
//   const messages = feedback.concat(idea);

 
//   const prompt = PromptTemplate.fromTemplate(TEMPLATE);
//   /**
//    * See a full list of supported models at:
//    * https://js.langchain.com/docs/modules/model_io/models/
//    */
//   const model = ChatOpenAI.create({
//     apiKey: process.env.OPENAI_API_KEY,
//     engine: 'davinci',
//     temperature: 0.9,
//     maxTokens: 150,
//     topP: 1,
//     presencePenalty: 0.6,
//     frequencyPenalty: 0.6,
//     stop: ['\n', ' Human:', ' AI:'],
//   });
 
//   /**
//    * Chat models stream message chunks rather than bytes, so this
//    * output parser handles serialization and encoding.
//    */
//   const outputParser = new BytesOutputParser();
 
//   /**
//    * Initialize the chain with the prompt, model, and output parser.
//    */
//   const chain = prompt.chain(model, outputParser);

//   /**
//    * Stream the messages into the chain.
//    */
//   for (const message of messages) {
//     chain.write(formatMessage(message));
//   }
 
//   /**
//    * Get the response from the chain.
//    */
//   const response = await chain.end();
// }