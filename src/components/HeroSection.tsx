
import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";

export function HeroSection() {
  return (
    <div className="relative w-full">
      {/* Add padding on the top of the hero section to avoid overlapping */}
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 pt-24 md:pt-32 lg:pt-40">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-blue-900 to-blue-600 dark:from-slate-300 dark:to-slate-700 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 font-bold tracking-tight drop-shadow-lg rounded-lg">
          Personalized Learning for a,
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-900 to-blue-600 dark:from-slate-200 dark:to-slate-700">
            Future-Ready You
          </span>
        </h2>
        <p className="text-gray-500 max-w-lg my-2 text-sm md:text-base text-center">
          Choose your path, set your goals, and let LearnWisdom AI build
          <br />
          <span className="flex items-center justify-center">the perfect course.</span>
        </p>

        <button
          className="relative px-6 py-3 backdrop-blur-sm border text-center rounded-full flex flex-row justify-center items-center gap-2 
          bg-blue-800 border-black text-white shadow-zinc-900 shadow-2xl
          dark:bg-[#006dff]/10 dark:border-[#006dff]/20 dark:text-slate-300 font-semibold
          transition-colors duration-300"
        >
          <span>Get Started </span>
          <svg
            width="0.625rem"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 9L9 1M9 1H2.5M9 1V7.22222"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-[#006dff] to-transparent" />
        </button>
      </BackgroundLines>
    </div>
  );
}
