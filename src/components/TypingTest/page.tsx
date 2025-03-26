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
    fetchTypingText().then(setText);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const newChar = newValue[newValue.length - 1];
    
    if (!startTime) setStartTime(Date.now());

    // Update total keystrokes (including mistakes & backspaces)
    setTotalKeystrokes((prev) => prev + 1);

    // Check if the typed character is correct
    if (newChar === text[newValue.length - 1]) {
      setCorrectChars((prev) => prev + 1);
    }

    // Adjust accuracy to account for backspaces
    const newAccuracy = Math.round((correctChars / totalKeystrokes) * 100) || 0;
    setAccuracy(newAccuracy);

    // Update input state
    setInput(newValue);

    // WPM Calculation
    if (newValue === text) {
      const endTime = Date.now();
      const elapsedMinutes = (endTime - startTime!) / 60000;
      const words = text.split(" ").length;
      setWpm(Math.round(words / elapsedMinutes));
    } else {
      const elapsedMinutes = ((Date.now() - startTime!) / 60000) || 1;
      const words = newValue.split(" ").length;
      setWpm(Math.round(words / elapsedMinutes));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0"
        value={input}
        onChange={handleChange}
        autoFocus
      />

      {/* Typing Test Text */}
      <div className="w-full max-w-3xl text-left text-white font-mono text-2xl overflow-hidden">
        {text.split("").map((char, index) => {
          let charClass = "text-gray-400"; // Default

          if (index < input.length) {
            charClass = input[index] === char ? "text-green-500" : "text-red-500";
          }

          return (
            <span key={index} className={`relative ${charClass}`}>
              {/* Cursor Positioned BEFORE Next Character */}
              {index === input.length && (
                <span className="absolute -left-[2px] bg-white w-[2px] h-6 inline-block animate-blink"></span>
              )}
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
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
