"use client";

import React, { useState } from "react";
import LoginFormProps from "@/app/types/props/LoginFormProps";

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    onSubmit(email, password).finally(() => setIsLoading(false));
  };

  return (
    <form dir="rtl" className="space-y-4" onSubmit={handleSubmit}>
      <fieldset className="border border-gray-300 p-2 rounded-lg">
        <legend className="text-md font-medium text-gray-700 px-2">
          אימייל
        </legend>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="focus:outline-none focus:border-none w-full"
        />
      </fieldset>
      <fieldset className="border border-gray-300 p-2 rounded-lg">
        <legend className="text-md font-medium text-gray-700 px-2">
          סיסמא
        </legend>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="focus:outline-none focus:border-none bg-none w-full"
        />
      </fieldset>
      <button
        type="submit"
        className="w-full px-4 py-2 font-semibold text-black border-2 border-blue-400 rounded-md hover:shadow-md focus:outline-none focus:ring-offset-2 focus:flex items-center justify-center"
      >
        {isLoading ? "מתחבר..." : "התחבר"}
      </button>
    </form>
  );
};

export default LoginForm;
