"use client"; // Ensure this is for client-side rendering

import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";
import { useSession } from "next-auth/react"; // Use the session hook from next-auth

const Navbar = () => {
  const { data: session } = useSession(); // useSession hook to get session data

  return (
    <nav className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2">
      <div className="flex items-center justify-center h-full gap-2 px-8 mx-auto sm:justify-between max-w-7xl">
        <Link href="/gallery" className="items-center hidden gap-2 sm:flex">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-y-[2px] md:block dark:border-white">
            LearnWisdom AI <span className="text-green-600 text-lg">.</span>
          </p>
        </Link>
        <div className="flex items-center">
          <Link href="/gallery" className="mr-3">
            Gallery
          </Link>
          {session?.user && (
            <>
              <Link href="/create" className="mr-3">
                Create Course
              </Link>
              <Link href="/settings" className="mr-3">
                Settings
              </Link>
            </>
          )}
          <ThemeToggle className="mr-3" />
          <div className="flex items-center">
            {session?.user ? (
              <UserAccountNav user={session.user} />
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
