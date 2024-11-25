"use client";
//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
import { createContext, useContext, useState } from "react";

type TypingContextProviderProps = {
  children: React.ReactNode;
};

// type TypingContext = {
//   selectedTime: number,
//   setSelectedTime: React.Dispatch<React.SetStateAction<number>>,
//   inputTextarea: string,
//   setInputTextarea: React.Dispatch<React.SetStateAction<string>>,
//   isTypingStarted: boolean,
//   setIsTypingStarted: React.Dispatch<React.SetStateAction<boolean>>,
//   typingError: number,
//   setTypingError: React.Dispatch<React.SetStateAction<number>>,
//   timeLeft: number,
//   setTimeLeft: React.Dispatch<React.SetStateAction<number>>,

// };

export const TypingContext = createContext<any | null>(null);

const TypingContextProvider = ({ children }: TypingContextProviderProps) => {
  const [selectedTime, setSelectedTime] = useState<number>(15);
  const [inputTextarea, setInputTextarea] = useState<string>("");
  const [isTypingStarted, setIsTypingStarted] = useState<boolean>(false);
  const [typingError, setTypingError] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(15);

  return (
    <TypingContext.Provider
      value={{
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
      }}
    >
      {children}
    </TypingContext.Provider>
  );
};
export default TypingContextProvider;

export const useTypingContext = () => {
  const context = useContext(TypingContext);
  if (!context) {
    console.log(
      "useTypingContext should be used inside a TypingContextProvider"
    );
  }
  return context;
};
