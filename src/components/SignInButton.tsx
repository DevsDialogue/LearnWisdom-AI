'use client'
import React from 'react'
import { Button } from './ui/button'
import { signIn } from "next-auth/react";

import React from "react";
import { Button } from "./ui/button"; // Assuming Button is a styled component
import { signIn } from "next-auth/react"; // Client-side sign-in

const SignInButton = () => {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        signIn("google"); // Trigger Google sign-in when button is clicked
      }}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
