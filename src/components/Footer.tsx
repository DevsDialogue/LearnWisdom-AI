"use client";
import React from "react";
import { FaEnvelope, FaYoutube, FaGithub } from "react-icons/fa";
import { People } from "@/components/ui/people";

export function Footer() {
  return (
    <footer className=" bg-gray-200 dark:bg-gray-950 text-white py-4 border-b border-zinc-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:space-y-0 space-y-6">
          {/* Logo or Site Name */}
          <div className="text-center md:text-left md:w-1/3 space-y-1">
            <h2 className="font-extrabold text-lg tracking-wider text-black dark:text-white">
              LearnWisdom AI
            </h2>
            <p className="text-black dark:text-white text-xs">
              Your gateway to quality education
            </p>
            <p className="text-black dark:text-white text-xs">
              Empowering learners everywhere
            </p>
          </div>

          {/* Contributors Section */}
          <div className="w-full md:w-1/3 text-center">
            <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
              Contributors
            </h3>
            <People />
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-center md:items-end md:w-1/3 space-y-2">
            <div className="flex space-x-3 text-black dark:text-white">
              <a
                href="mailto:Suraj.p.kumar@gmail.com"
                className="hover:text-yellow-500"
              >
                <FaEnvelope className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@Surajkumar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-500"
              >
                <FaYoutube className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/DevsDialogue/LearnWisdom-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-500"
              >
                <FaGithub className="h-4 w-4" />
              </a>
            </div>
            <p className="text-black dark:text-white text-xs text-center">
              Follow us on social media for updates!
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-4 border-t border-gray-700 pt-3">
          <p className="text-center text-black dark:text-white text-xs">
            &copy; {new Date().getFullYear()} LearnWisdom AI. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
