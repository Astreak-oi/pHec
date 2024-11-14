"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import { Textarea } from "@/components/ui/textarea";
import Gradient from "@/components/gradient";
import SelectMenu from "@/components/shared/select";
import { nameLength } from "@/config/ai/menu";

export default function NameAI() {
  const [idea, setIdea] = useState("");
  const [generatedNames, setGeneratedNames] = useState<
    { name: string; description: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const res = await fetch("/api/ai/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: idea }),
      });

      if (res.ok) {
        const data = await res.json();

        // Extract the JSON string from data.text
        const rawText = data.text;
        const jsonString = rawText.replace(/```json\n|```/g, ""); // Remove the triple backticks and 'json' label

        // Parse the cleaned JSON string
        const parsedData = JSON.parse(jsonString);
        setGeneratedNames(parsedData.names ?? []);
      } else {
        console.error("Failed to get response from server");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };


  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      {/* Gradient Start */}

      <Gradient />

      {/* Gradient End */}

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-10 sm:mt-12">
        <h1 className="sm:text-5xl text-3xl max-w-[708px] font-bold text-slate-900">
          Get Your Unique Business or Startup Name
        </h1>
        <p className="text-slate-500 mt-5">
          Please note that Name may not be 100% valuable.
        </p>
        <form className="max-w-xl w-full" onSubmit={handleSubmit}>
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium">
              Just enter your startup idea
            </p>
          </div>
          <Textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={2}
            className="w-full my-5"
            placeholder={
              "Describe your idea (e.g., An app for teaching cats breakdancing!)"
            }
          />
          <SelectMenu
            options={nameLength}
            placeholder="Name Length"
            label="Name Length"
            // onSelect={handleSelect}
          />

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
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {generatedNames?.length > 0 && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {generatedNames.map((nameObject, index) => (
                <div
                  key={index}
                  className="flex flex-col border shadow-sm rounded-xl hover:shadow-md transition bg-slate-100 border-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <div className="p-4 md:p-5">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className=" font-semibold  dark:group-hover:text-gray-800 text-slate-900">
                          {nameObject.name}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {nameObject.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
