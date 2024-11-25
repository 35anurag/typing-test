import "./globals.css";
import TypingContextProvider from "./typingContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TypingContextProvider>{children}</TypingContextProvider></body>
    </html>
  );
}
