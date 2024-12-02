"use client";

import React from "react";
import { signIn } from "next-auth/react";

const GoogleSignInButton = () => {
  return (
    <button
      onClick={() => signIn("google")}
      className="w-full px-4 py-2 bg-red-500 text-white rounded-md"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
