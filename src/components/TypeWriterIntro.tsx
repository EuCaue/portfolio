import React, { useState, useEffect } from "react";
export default function TypeWriterIntro({ words }: { words: string[] }) {
  let className = "flex flex-col gap-4 items-center justify-center self-center";
  const typeWriterClass =
    "font-bold border-b-2 border-b-blue-400 border-r-2 pr-1" +
    "animate-cursor overflow-hidden whitespace-nowrap transition-[width] ease-in-out duration-1000 mr-auto";
  const [currentWord, setCurrentWord] = useState(0);
  const [collapseClass, setCollapseClass] = useState(" w-0");
  useEffect(() => {
    setTimeout(() => setCollapseClass(" w-48 lg:w-64"), 100);
    const incrementWord = async () => {
      // Set the width to 0 - transition duration is 1000ms
      setCollapseClass(" w-0");
      setTimeout(() => {
        /**
         * After 1100ms, change the displayed text while the div
         * is collapsed by incrementing the index
         */
        setCurrentWord((oldVal) => {
          let wordIndex;
          if (oldVal >= words.length - 1) {
            wordIndex = 0;
          } else {
            wordIndex = oldVal + 1;
          }
          return wordIndex;
        });
      }, 1100);
      // After 1000ms, set width - transition duration is 1000ms
      setTimeout(() => {
        setCollapseClass(" w-48 lg:w-64");
      }, 1000);
    };
    // Interval timer to change text every 4000ms
    const id = setInterval(incrementWord, 4000);
    // Cleanup interval timer
    return () => clearInterval(id);
  }, []); //  eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={className}>
      <div className="flex gap-2 text-2xl md:text-4xl ">
        <h1 className="text-5xl lg:text-6xl font-bold">Hello </h1>
        <span
          className={`text-5xl lg:text-6xl font-bold ${typeWriterClass}${collapseClass}`}
        >
          {words[currentWord]}
        </span>
        <span className="text-5xl lg:text-6xl font-bold">.</span>
      </div>
    </div>
  );
}
