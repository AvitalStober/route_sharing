"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/app/components/Connection steps/LoginForm";
import GoogleSignInButton from "@/app/components/Connection steps/GoogleButton";
import { loginFunction } from "@/app/services/userService";

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    try {
      const token = await loginFunction(email, password);
      console.log(token);
      
      if (token) {
        router.push("/"); 
      } else {
        setError("Invalid email or password");
      }
    } catch {
      console.error("Failed to connect");
      setError("An error occurred while trying to log in.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <LoginForm onSubmit={handleLogin} />
        <div className="text-center">
          <GoogleSignInButton />
        </div>
        <p className="mt-2 text-gray-700">
          Don&apos;t have an account? <a href="./signup" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
