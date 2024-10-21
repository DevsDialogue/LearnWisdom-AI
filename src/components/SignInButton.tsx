"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

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
