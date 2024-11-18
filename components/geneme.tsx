"use client";
import { useState } from "react";

export default function Gename() {
  const [idea, setIdea] = useState("");
  const [generatedNames, setGeneratedNames] = useState<
    { name: string; description: string }[]
  >([]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: idea }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("API Response:", data);
        const parsedData = JSON.parse(data.text); // Parse the JSON string
        setGeneratedNames(parsedData.names ?? []);
      } else {
        console.error("Failed to get response from server");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="relative h-screen">
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {generatedNames?.length > 0 && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {generatedNames.map((nameObject, index) => (
                <div
                  key={index}
                  className="group flex flex-col  border shadow-sm rounded-xl hover:shadow-md transition bg-slate-900 dark:border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <div className="p-4 md:p-5">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className=" font-semibold  dark:group-hover:text-gray-400 text-gray-200">
                          {nameObject.name}
                        </h3>
                        <p className="text-sm text-gray-400">
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

        <footer className="fixed w-full bottom-0 z-10 border-t pt-2 pb-3 sm:pt-4 sm:pb-6 bg-slate-900 border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <form onSubmit={handleSubmit}>
                <textarea
                  className="p-4 pb-12 block w-full  rounded-lg text-sm focus:border-blue-500  disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-gray-700 text-gray-400 focus:ring-gray-600"
                  placeholder="Ask me anything..."
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  rows={2}
                  cols={40}
                ></textarea>

                <div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-slate-900">
                  <div className="flex justify-end items-center">
                    <div className="flex items-center gap-x-1">
                      <button
                        type="button"
                        className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        <svg
                          className="flex-shrink-0 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                      </button>
                      <button
                        type="submit"
                        className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        <svg
                          className="flex-shrink-0 h-3.5 w-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
