"use client";

import { Analytics } from "@vercel/analytics/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ParticlesBackground from "./particles";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const [userInput, setUserInput] = useState("");

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 overflow-hidden">
      <ParticlesBackground />
      {/* Headshot Image */}
      <div className="mb-4">
        <Image
          src="/headshot.jpg" // Make sure to replace with your actual image name
          alt="Hamza's Headshot"
          width={170}
          height={170}
          className="rounded-full border-4 border-white shadow-lg"
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

      {/* Input Form */}
      <div className="relative w-full max-w-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent form submission refresh
            console.log(userInput); // Log or handle the input
            setUserInput(""); // Clear input after submission
          }}
          className="flex items-center bg-gray-800 rounded-full py-3 px-5 shadow-lg"
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
            className="ml-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-200"
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
