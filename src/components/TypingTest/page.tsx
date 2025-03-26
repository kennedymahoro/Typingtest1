"use client"
import { useEffect, useState, useRef } from "react";
import { fetchTypingText } from "../../../utils/api";

const TypingTest = () => {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const inputRef = useRef<HTMLInputElement>(null);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);

  useEffect(() => {
    fetchTypingText().then((fullText) => {
      const words = fullText.split(" ").slice(0, 25).join(" "); // Limit to ~25 words
      setText(words);
    });
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!startTime) setStartTime(Date.now());

    setTotalKeystrokes((prev) => prev + 1);

    if (newValue.length > input.length) {
      const newChar = newValue[newValue.length - 1];
      if (newChar === text[newValue.length - 1]) {
        setCorrectChars((prev) => prev + 1);
      }
    }

    const newAccuracy = Math.round((correctChars / totalKeystrokes) * 100) || 0;
    setAccuracy(newAccuracy);

    setInput(newValue);

    const elapsedMinutes = ((Date.now() - startTime!) / 60000) || 1;
    const words = newValue.split(" ").length;
    setWpm(Math.round(words / elapsedMinutes));
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-screen px-4"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0"
        value={input}
        onChange={handleChange}
        autoFocus
      />

      {/* Typing Text with Cursor */}
      <div className="w-full max-w-3xl text-left text-white font-mono text-2xl leading-relaxed">
        {text.split(" ").map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-3"> {/* Ensures words stay on one line */}
            {word.split("").map((char, charIndex) => {
              const index = text.split("").slice(0, text.indexOf(word)).length + charIndex; // Get absolute index
              let charClass = "text-gray-600"; // Default (upcoming text)

              if (index < input.length) {
                if (char === " ") {
                  charClass = input[index] === " " ? "text-green-500" : "bg-red-500 text-white px-2 rounded"; // Spaces
                } else {
                  charClass = input[index] === char ? "text-green-500" : "text-red-500"; // Normal characters
                }
              }

              return (
                <span key={charIndex} className={`relative ${charClass} inline-block mx-[2px]`}>
                  {/* Cursor moves inline, appearing AFTER the typed character */}
                  {index === input.length && (
                    <span className="absolute -bottom-[2px] -right-[2px] bg-white w-[3px] h-[1.4em] inline-block animate-blink"></span>
                  )}
                  {char}
                </span>
              );
            })}
          </span>
        ))}
        {/* Cursor at the end if user finishes typing */}
        {input.length === text.length && (
          <span className="inline-block bg-white w-[3px] h-[1.4em] animate-blink"></span>
        )}
      </div>

      {/* Real-time WPM & Accuracy */}
      <div className="mt-4 text-xl text-white font-bold">
        <p>WPM: {wpm}</p>
        <p>Accuracy: {accuracy}%</p>
      </div>
    </div>
  );
};

export default TypingTest;
