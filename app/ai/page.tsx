"use client";

import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { FeedbackType } from "@/components/DropDown";
import Footer from "@/components/Footer";
import Github from "@/components/GitHub";
import { useChat } from "ai/react";
// import Header from "@/components/Header";

export default function Page() {
  const [idea, setIdea] = useState("");
  const [feedback, setFeedback] = useState<FeedbackType>("Constructive");

  const ideaRef = useRef<null | HTMLDivElement>(null);

  const scrollToIdeas = () => {
    if (ideaRef.current !== null) {
      ideaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      body: {
        feedback,
        idea,
      },
      onResponse() {
        scrollToIdeas();
      },
    });

  const onSubmit = (e: any) => {
    setIdea(input);
    handleSubmit(e);
  };

  const lastMessage = messages[messages.length - 1];
  const generatedIdeas =
    lastMessage?.role === "assistant" ? lastMessage.content : null;
  console.log(generatedIdeas);

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Get Idea Rating & Feedback By AI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Grow your ideas with the help of AI.
        </h1>
        <p className="text-slate-500 mt-5">Not 100% Accurate </p>
        <form className="max-w-xl w-full" onSubmit={onSubmit}>
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Just enter your idea{" "}
              <span className="text-slate-500">
                (or write a few sentences about your business idea)
              </span>
              .
            </p>
          </div>
          <textarea
            value={input}
            onChange={handleInputChange}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. Objective: My idea is to develop a mobile app that connects local farmers directly with consumers, enabling them to purchase fresh produce and support local agriculture."
            }
          />
          <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select your feedback type</p>
          </div>
          <div className="block">
            <DropDown
              feedback={feedback}
              setFeedback={(newFeedback) => setFeedback(newFeedback)}
            />
          </div>

          {!isLoading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              type="submit"
            >
              Continue with Idea &rarr;
            </button>
          )}
          {isLoading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <span className="loading">
                <span style={{ backgroundColor: "white" }} />
                <span style={{ backgroundColor: "white" }} />
                <span style={{ backgroundColor: "white" }} />
              </span>
            </button>
          )}
        </form>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10 max-w-xl w-full">
          {generatedIdeas && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={ideaRef}
                >
                  Rating and Feedback
                </h2>
              </div>
              {(() => {
                try {
                  let jsonString = generatedIdeas.trim().replace("idea: ", "");
                  let parsedIdeas = JSON.parse(jsonString);
                  let rating = parsedIdeas.rating;
                  let feedback = parsedIdeas.feedback;

                  return (
                    <div>
                      <div>
                        <p className="text-left text-sm font-medium">Rating</p>
                        <div className="flex items-center mb-3">
                          <div className="w-full dark:bg-gray-200 rounded h-2.5 bg-gray-700 mr-2">
                            <div
                              className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                              style={{ width: `${rating * 10}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-slate-500">
                            {rating}/10
                          </span>
                        </div>
                      </div>
                      <p className="text-left text-lg font-bold">Feedback</p>
                      <div className="bg-white rounded-xl shadow-md p-4 hover-bg-gray-100 transition cursor-copy border">
                        <div className="mt-2 p-2">
                          
                          <ul>
                            {feedback.map((item: any) => (
                              <li className="text-sm text-left my-2" key={item}>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                } catch (error) {
                  console.error("Error parsing JSON data:", error);
                  return (
                    <div>
                      <p>Unable to parse the response. Please try again.</p>
                    </div>
                  );
                }
              })()}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
