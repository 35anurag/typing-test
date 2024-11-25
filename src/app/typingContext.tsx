"use client";
import { createContext, useContext, useState } from "react";

type TypingContextProviderProps = {
  children: React.ReactNode;
};

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
