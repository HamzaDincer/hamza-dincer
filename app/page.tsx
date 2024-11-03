"use client";

import { Analytics } from "@vercel/analytics/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ParticlesBackground from "./particles";
import { Typewriter } from "react-simple-typewriter";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatActive, setIsChatActive] = useState(false);

  const handleUserInput = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Activate chat on first input submission
    if (!isChatActive) setIsChatActive(true);

    // Display user's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userInput },
    ]);

    // Send user input to the API
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();

      // Display bot's response
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: data.reply },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "An error occurred. Please try again." },
      ]);
    }

    // Clear user input
    setUserInput("");
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-dvh bg-black text-white p-8 overflow-hidden">
      <ParticlesBackground />

      {/* Conditional Display for Headshot Image and Intro Text */}
      {!isChatActive && (
        <>
          {/* Headshot Image */}
          <div className="mb-4 relative z-10">
            <Image
              src="/headshot.jpg" // Replace with your actual image
              alt="Hamza's Headshot"
              width={170}
              height={170}
              className="rounded-full border-4 border-white shadow-lg bg-transparent"
            />
          </div>

          {/* Typing Animation Heading */}
          <h1 className="text-3xl font-semibold mb-8 text-center">
            <Typewriter
              words={[
                "Hi, I am Hamza, a Software Developer.",
                "What would you like to learn about me?",
              ]}
              loop={1} // Set to 0 for infinite loop
              cursor
              cursorStyle="|"
              typeSpeed={75}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
        </>
      )}

      {/* Chatbox */}
      {isChatActive && (
        <div className="relative w-full max-w-4xl h-full p-4 mb-4 bg-zinc-800 rounded-xl shadow-lg overflow-y-auto">
          {/* Messages */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "bot" ? "justify-start" : "justify-end"
              } mb-2 items-center`}
            >
              {/* Headshot Icon for Bot Messages */}
              {msg.sender === "bot" && (
                <Image
                  src="/headshot.jpg" // Replace with your actual image
                  alt="Bot Icon"
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
              )}
              <div
                className={`px-4 py-2 rounded-lg shadow ${
                  msg.sender === "bot"
                    ? "bg-gray-700 text-white"
                    : "bg-blue-500 text-white"
                } max-w-[75%]`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Input Form */}
      <div className="relative w-full max-w-2xl">
        <form
          onSubmit={handleUserInput}
          className="flex items-center bg-zinc-800 rounded-full py-3 px-5 shadow-lg"
        >
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask Me Anything About Me..."
            className="flex-grow bg-transparent text-white placeholder-white focus:outline-none"
          />
          <button
            type="submit"
            className="ml-4 p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-200"
          >
            <Image
              src="/send-icon.svg"
              alt="Send Icon"
              width={20}
              height={20}
            />
          </button>
        </form>
        <Analytics />
      </div>

      {/* Footer Links */}
      <footer className="mt-12 flex gap-6 flex-wrap items-center justify-center">
        <Link href="/projects">
          <span className="flex items-center gap-2 hover:underline hover:underline-offset-4 cursor-pointer">
            <Image
              aria-hidden
              src="/portfolio-icon.svg"
              alt="Portfolio icon"
              width={24}
              height={24}
            />
            My Projects
          </span>
        </Link>
        <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          <span className="flex items-center gap-2 hover:underline hover:underline-offset-4 cursor-pointer">
            <Image
              aria-hidden
              src="/download-icon.svg"
              alt="Download icon"
              width={20}
              height={20}
            />
            Resume
          </span>
        </Link>
        <Link
          href="https://github.com/HamzaDincer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="flex items-center gap-2 hover:underline hover:underline-offset-4 cursor-pointer">
            <Image
              aria-hidden
              src="/github-icon.svg"
              alt="GitHub icon"
              width={20}
              height={20}
            />
            GitHub
          </span>
        </Link>
        <Link
          href="https://linkedin.com/in/hamza-dincer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="flex items-center gap-2 hover:underline hover:underline-offset-4 cursor-pointer">
            <Image
              aria-hidden
              src="/linkedin-icon.svg"
              alt="LinkedIn icon"
              width={20}
              height={20}
            />
            LinkedIn
          </span>
        </Link>
      </footer>
    </div>
  );
}
