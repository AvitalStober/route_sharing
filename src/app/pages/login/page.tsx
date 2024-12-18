"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/app/components/ConnectionSteps/LoginForm";
import GoogleSignInButton from "@/app/components/ConnectionSteps/GoogleButton";
import { loginFunction } from "@/app/services/userService";
import { z } from "zod";

const passwordSchema = z.string().min(4, "Password must be at least 4 characters long");

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    try {
      // Validate password
      passwordSchema.parse(password);
      const token = await loginFunction(email, password);

      if (token) {
        router.push("/pages/home");
      } else {
        setError("Invalid email or password");
      }
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
      } else {
        console.error("Failed to connect");
        setError("An error occurred while trying to log in.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div dir="rtl" className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          התחברות
        </h2>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <LoginForm onSubmit={handleLogin} />
        <div className="text-center">
          <GoogleSignInButton />
        </div>
        <p className="mt-2 text-center text-gray-700">
          עדיין אין לך חשבון?{" "}
          <a href="./signup" className="text-blue-500">
            הרשמה
          </a>
        </p>
        <a href="./forgetPassword" className="text-blue-500">שכחת סיסמא?</a>

      </div>
    </div>
  );
};

export default Login;
