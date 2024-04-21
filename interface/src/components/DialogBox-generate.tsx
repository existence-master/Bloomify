"use client";
import { useState } from "react";

const GenerateDialogBox = ({ generateEndpoint = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [disciplineOfStudy, setDisciplineOfStudy] = useState("");
  const [subject, setSubject] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [paperPattern, setPaperPattern] = useState("");
  const [averageBloomLevel, setAverageBloomLevel] = useState("");
  const [error, setError] = useState("");
  const [responseText, setResponseText] = useState("");

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setYearOfStudy("");
    setDisciplineOfStudy("");
    setSubject("");
    setSyllabus("");
    setPaperPattern("");
    setAverageBloomLevel("");
    setError("");
  };

  const sendMessage = async () => {
    setIsLoading(true);
    try {
      const genstring = `#YEAR OF STUDY = ${yearOfStudy}, #DISCIPLINE OF STUDY = ${disciplineOfStudy}, #SUBJECT = ${subject}, #SYLLABUS = ${syllabus}, #PAPER PATTERN = ${paperPattern}, #AVERAGE BLOOM LEVEL = ${averageBloomLevel}`;
      const userInput = { input_text: genstring };
      console.log("User Input:", userInput);

      const response = await fetch(generateEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const responseData = await response.text();
      console.log("Response:", responseData);
      setResponseText(responseData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      closeDialog();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={openDialog}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate
      </button>

      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Enter details</h3>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="w-full text-black border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        value={yearOfStudy}
                        onChange={(e) => setYearOfStudy(e.target.value)}
                        placeholder="Year of study"
                      />
                      <input
                        type="text"
                        className="w-full text-black border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mt-2"
                        value={disciplineOfStudy}
                        onChange={(e) => setDisciplineOfStudy(e.target.value)}
                        placeholder="Discipline of study"
                      />
                      <input
                        type="text"
                        className="w-full text-black border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mt-2"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Subject"
                      />
                      <input
                        type="text"
                        className="w-full text-black border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mt-2"
                        value={syllabus}
                        onChange={(e) => setSyllabus(e.target.value)}
                        placeholder="Syllabus"
                      />
                      <input
                        type="text"
                        className="w-full text-black border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mt-2"
                        value={paperPattern}
                        onChange={(e) => setPaperPattern(e.target.value)}
                        placeholder="Paper pattern"
                      />
                      <input
                        type="text"
                        className="w-full text-black border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mt-2"
                        value={averageBloomLevel}
                        onChange={(e) => setAverageBloomLevel(e.target.value)}
                        placeholder="Average bloom level"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={sendMessage}
                  disabled={isLoading}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${
                    isLoading ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  {isLoading ? "Generating..." : "Generate"}
                </button>
                
                <button
                  onClick={closeDialog}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateDialogBox;
