"use client";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { IoTime } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";
import TextString from "./text";

import { useTypingContext } from "./typingContext";

const Page = () => {
  const {
    selectedTime,
    setSelectedTime,
    inputTextarea,
    setInputTextarea,
    isTypingStarted,
    setIsTypingStarted,
    typingError,
    setTypingError,
    timeLeft,
    setTimeLeft,
  } = useTypingContext();


  const router = useRouter();
  const timeArray = [15, 30, 60, 120];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTypingStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev:number) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 ) {
      router.push("/result");
    }
    return () => clearInterval(timer);
  }, [isTypingStarted, timeLeft, router]);

  const handleInputTextareaValue = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const typedValue = event.target.value;
      setInputTextarea(typedValue);

      if (!isTypingStarted) {
        setIsTypingStarted(true);
      }

      // Calculate errors
      const errorCount = TextString[0]
        .split("")
        .reduce((errors, char, index) => {
          return char === typedValue[index] ? errors : errors + 1;
        }, 0);

      setTypingError(errorCount);
    },
    [isTypingStarted]
  );

  console.log(typingError);

  const handleRestart = useCallback(() => {
    setInputTextarea("");
    setSelectedTime(timeArray[0]);
    setTimeLeft(timeArray[0]);
    setIsTypingStarted(false);
    setTypingError(0);
  }, [timeArray]);

  const handleClickTime = (time: number) => {
    setSelectedTime(time);
    setTimeLeft(time);
    setInputTextarea("");
    setIsTypingStarted(false);
    setTypingError(0);
  };

  // Display Typing Text
  const showCharacter = () => {
    return TextString[0].split("").map((char, index) => {
      const typedChar = inputTextarea[index];
      const isCorrect = typedChar === char;

      return (
        <span
          key={index}
          style={{
            color: typedChar ? (isCorrect ? "white" : "red") : "gray",
            fontFamily: "monospace",
            display: "inline-block",
            width: "1ch",
            userSelect: "none",
          }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div className="p-[2rem] mx-[7rem] my-[2.5rem]">
      <div className="flex flex-col items-center justify-center gap-[4rem]">
        {/* Header */}
        <div className="flex flex-row items-center justify-start gap-[8rem] bg-[#2d2e32] p-3 px-7 rounded-lg">
          <p className="font-bold text-[22px] text-yellow-600 bg-[#2d2e32]">Typing Test</p>
          <div className="flex flex-row gap-4 text-yellow-600 bg-[#2d2e32]">
            <p className="text-[16px] font-medium flex flex-row items-center gap-1 bg-[#2d2e32]">
              <IoTime />
              <span className="bg-[#2d2e32]">Time</span>
            </p>
            {isTypingStarted && timeLeft > 0 ? (
              <p className="font-semibold text-slate-500">{timeLeft} sec</p>
            ) : (
              <div className="flex flex-row gap-2 font-semibold text-slate-500 bg-[#2d2e32]">
                {timeArray.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleClickTime(time)}
                    className="hover:text-yellow-400"
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative w-[900px]">
          <p
            className="font-bold text-xl text-justify max-w-[900px] tracking-wide font-mono"
            style={{ userSelect: "none" }}
          >
            {showCharacter()}
          </p>
          <textarea
            value={inputTextarea}
            onChange={handleInputTextareaValue}
            spellCheck= {false}
            className="outline-none absolute top-0 left-0 resize-none text-xl font-bold h-[200px] w-full bg-transparent text-transparent font-mono select-none"
            style={{ opacity: timeLeft > 0 ? 1 : 0 }}
            disabled={timeLeft <= 0}
          />
        </div>

        <button
          onClick={handleRestart}
          className="text-yellow-600 flex flex-row gap-1 items-center"
        >
          <VscDebugRestart />
          <p>Restart</p>
        </button>
      </div>
    </div>
  );
};

export default Page;
