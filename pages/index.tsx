import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { FeedbackType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState("");
  const [feedback, setFeedback] = useState<FeedbackType>("Constructive");
  const [generatedIdeas, setGeneratedIdeas] = useState<String>("");

  const ideaRef = useRef<null | HTMLDivElement>(null);

  const scrollToIdeas = () => {
    if (ideaRef.current !== null) {
      ideaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Rate the following ${idea} on a scale from 1 to 10, with 1 being poor and 10 being excellent. Provide ${feedback} feedback to help improve the idea. twitter ideagraphies with no hashtags and clearly labeled "1." and "2.". ${
    feedback === "Innovative"
      ? "Make sure there is a innovative idea in there and it's a little unique."
      : null
  }
      Make sure each generated ideagraphy is less than 160 characters, has short sentences that are found in Buisness ideas, and base them on this context: ${idea}${
    idea.slice(-1) === "." ? "" : "."
  }`;

  const generateIdea = async (e: any) => {
    e.preventDefault();
    setGeneratedIdeas("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const onParse = (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === "event") {
        const data = event.data;
        try {
          const text = JSON.parse(data).text ?? ""
          setGeneratedIdeas((prev) => prev + text);
        } catch (e) {
          console.error(e);
        }
      }
    }

    // https://web.dev/streams/#the-getreader-and-read-methods
    const reader = data.getReader();
    const decoder = new TextDecoder();
    const parser = createParser(onParse);
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      parser.feed(chunkValue);
    }
    scrollToIdeas();
    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Get Idea Rating & Feedback By AI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Header /> */}
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
        <p className="text-slate-500 mt-5">47,118 ideas rated so far.</p>
        <div className="max-w-xl w-full">
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
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
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
            <DropDown feedback={feedback} setFeedback={(newFeedback) => setFeedback(newFeedback)} />
          </div>

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateIdea(e)}
            >
              Go With Idea &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
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
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedIdeas
                  .substring(generatedIdeas.indexOf("1") + 3)
                  .split("2.")
                  .map((generatedIdea) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedIdea);
                          toast("Idea copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                        key={generatedIdea}
                      >
                        <p>{generatedIdea}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
