"use client";
import { useRouter } from "next/navigation";
import { useTypingContext } from "../typingContext";
import TextString from "../text";
import { VscDebugRestart } from "react-icons/vsc";

const page = () => {
  // formual to find typing speed is written (character/ 5)/1min
  const router = useRouter();
  const {
    typingError,
    setInputTextarea,
    setIsTypingStarted,
    setTypingError,
    setTimeLeft,
    selectedTime,
  } = useTypingContext();

  const handleRetake = () => {
    setTimeLeft(15)
    setInputTextarea("");
    setIsTypingStarted(false);
    setTypingError(0);
    router.push("/");
  };

  let CorrectChar = TextString[0].length - typingError;
  let CorrectScore = CorrectChar / 5 / (selectedTime / 60);

  return (
    <div className="mx-[5rem] my-[5rem]">
      <div className="flex flex-col items-center gap-[3rem]">
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-medium text-slate-300">wpm</p>
          <p className="font-bold text-3xl text-yellow-100">
            {Math.floor(CorrectScore)}
          </p>
        </div>
        <div>
          <button
            onClick={handleRetake}
            className="flex flex-row items-center justify-center text-yellow-500"
          >
            <VscDebugRestart />
            <p>Retake</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
