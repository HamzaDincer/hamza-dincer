"use client";

import { useMemo, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "black",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 overflow-hidden">
      {/* Particle Background */}
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}

      {/* Futuristic Interactive Heading */}
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Hi, I am Hamza, a Software Developer. What would you like to learn about
        me?
      </h1>

      {/* Input Form */}
      <div className="relative w-full max-w-lg">
        <form className="flex items-center bg-gray-800 rounded-full py-3 px-5 shadow-lg">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask Me Anything About Me"
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
