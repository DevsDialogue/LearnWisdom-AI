"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Hritik Ranjan",
    designation: "Software Engineer",
    image:
      "/hritik.png",
    link: "https://x.com/hritikranjan",
  },

  {
    id: 2,
    name: "Suraj Kumar",
    designation: "DevOps Engineer",
    image:
      "/suraj.jpeg",
      link: "https://x.com/surajk_umar01",
  },
    {
    id: 3,
    name: "Kumari Anjali",
    designation: "Software Engineer",
    image:
      "/anjali.jpeg",
    link: "https://www.linkedin.com/in/kumarianjali10/",
  },



];

export function People() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      {people.map((person) => (
        <a
          key={person.id}
          href={person.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-1"
        >
          <AnimatedTooltip items={[person]} />
        </a>
      ))}
    </div>
  );
}
