"use client";
import React from "react";
import { FaFacebook, FaTwitter, FaEnvelope, FaYoutube, FaGithub } from "react-icons/fa";
import { People } from "@/components/ui/people";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-950 to-slate-900 text-white py-4   ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          
          {/* Logo or Site Name */}
          <div className="flex flex-col items-center md:items-start md:w-1/3 space-y-2">
            <h2 className="font-extrabold text-2xl tracking-wider">LearnWisdom AI</h2>
            <p className="text-gray-400">Your gateway to quality education</p>
            <p className="text-sm text-gray-500">Empowering learners everywhere</p>
          </div>

          {/* Contributors Section */}
          <div className="w-full md:w-1/3 text-center">
            <h3 className="text-xl font-semibold mb-4">Contributors</h3>
            <People />
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-center md:items-end md:w-1/3 space-y-4">
            <div className="flex space-x-4">
            
           
              <a href="mailto:Suraj.p.kumar@gmail.com" className="hover:text-yellow-500">
                <FaEnvelope className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/@Surajkumar" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                <FaYoutube className="h-6 w-6" />
              </a>
              <a href="https://github.com/DevsDialogue/LearnWisdom-AI" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                <FaGithub className="h-6 w-6" />
              </a>
            </div>
            <p className="text-gray-400 text-sm text-center">
              Follow us on social media for updates!
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-center text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} LearnWisdom AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
