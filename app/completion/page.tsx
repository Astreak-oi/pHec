"use client";

import Head from "next/head";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { FeedbackType } from "@/components/DropDown";
import Footer from "@/components/Footer";
import { useCompletion } from "ai/react";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Icons } from "@/components/icons";

export default function Page() {
  const [idea, setIdea] = useState("");
  const [feedback, setFeedback] = useState<FeedbackType>("Constructive");

  const ideaRef = useRef<null | HTMLDivElement>(null);

  const scrollToIdeas = () => {
    if (ideaRef.current !== null) {
      ideaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const {
    completion,
    input,
    isLoading,
    stop,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: "/api/completion",
    
    onResponse() {
      scrollToIdeas();
    },
  });

  

  const onSubmit = (e: any) => {
    setIdea(input);
    handleSubmit(e);
  };

  const generatedIdeas = completion[completion.length - 1];
  //console.log(generatedIdeas); // Logs the generated ideas is Undefined
  //console.log(idea,); // Logs the idea is correct
  //console.log(feedback); // Logs the feedback is correct 
  //console.log(input); // Logs the input is correct
  console.log(completion)

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Get Idea Rating & Feedback By AI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Gradient Start */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Gradient End */}

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://twitter.com/theskaai"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icons.spark className="h-5 w-5" />
          <p>Announcement</p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Grow your ideas with the help of AI.
        </h1>
        <p className="text-slate-500 mt-5">
          Please note that AI rating may not be 100% accurate
        </p>
        <form className="max-w-xl w-full" onSubmit={onSubmit}>
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium">
              Just enter your Startup idea
            </p>
          </div>
          <Textarea
            value={input}
            onChange={handleInputChange}
            rows={5}
            minLength={50}
            className="w-full my-5"
            placeholder={
              "Describe your idea (e.g., An app for teaching cats breakdancing!)"
            }
          />

          <div className="flex mb-3 items-center space-x-3">
            <p className="text-left font-medium">Select your feedback type</p>
          </div>

          <div className="block">
            <DropDown
              feedback={feedback}
              setFeedback={(newFeedback) => setFeedback(newFeedback)}
            />
          </div>

          <div className="flex flex-col my-4 space-x-3 sm:flex-row item-center">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Stage</SelectLabel>
                  <SelectItem value="generation">Generation</SelectItem>
                  <SelectItem value="screening">Screening</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="analysis">Analysis</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                  <SelectItem value="commercialization">
                    Commercialization
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Idea Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Idea Section</SelectLabel>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="hiring">Hiring</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="strategy">Strategy</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="sustainability">Sustainability</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
          <button type="button" onClick={stop}>
          Stop
        </button>
        </form>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />

        <Card className="my-10 max-w-xl w-full">
          {generatedIdeas && (
            <>
              <CardHeader>
                <CardTitle ref={ideaRef}>Rating and Feedback</CardTitle>
              </CardHeader>

              {(() => {
                // Extract JSON data from the generatedIdeas string
                let jsonString = generatedIdeas.trim().replace("idea:", "");
                try {
                  let parsedIdeas = JSON.parse(jsonString);

                  // Check if "rating" and "feedback" properties exist
                  if (
                    parsedIdeas &&
                    parsedIdeas.rating &&
                    parsedIdeas.feedback
                  ) {
                    let rating = parsedIdeas.rating;
                    let feedbacks = parsedIdeas.feedback;
                    console.log(`Rating: ${rating}`);
                    console.log(`Feedback: ${feedback}`);

                    return (
                      <CardContent className="grid gap-4">
                        <p className="text-left font-medium text-slate-700">
                          Rating
                        </p>

                        {/* <div className=" flex ms-4 items-center space-x-4 rounded-md border p-4">
                          <div className="flex-1 space-y-1">
                            <div className="w-full dark:bg-gray-200 rounded h-2.5 bg-gray-700 mr-2">
                              <div
                                className="bg-blue-400 h-2.5 rounded dark:bg-blue-500"
                                style={{ width: `${rating * 10}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-slate-600">
                            {rating}/10
                          </span>
                        </div> */}

                        <div className="flex ms-4 items-center space-x-4 rounded-md border p-4">
                          <div className="flex-1 space-y-1">
                            <div className="w-full dark:bg-gray-500 rounded h-2.5 bg-gray-300 mr-2 ">
                              <div
                                className={`h-2.5 rounded ${
                                  rating >= 7
                                    ? "bg-green-400" // Green for high ratings (7-10)
                                    : rating >= 4
                                    ? "bg-orange-400" // Yellow for medium ratings (4-6)
                                    : "bg-red-400" // Red for low ratings (1-3)
                                }`}
                                style={{ width: `${rating * 10}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-slate-600">
                            {rating}/10
                          </span>
                        </div>

                        <p className="text-left font-medium text-slate-700">
                          Feedback
                        </p>

                        <div>
                          {feedbacks.map((item: any) => (
                            <div
                              key={item}
                              className=" items-start ms-4 pb-3 last:mb-0 last:pb-0 "
                            >
                              <div className="space-y-1">
                                <p className="text-sm text-left font-medium">
                                  {item}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    );
                  }
                } catch (error) {
                  console.error("Error parsing JSON data:", error);
                }
              })()}
            </>
          )}
        </Card>
      </main>
      <Footer />
    </div>
  );
}
