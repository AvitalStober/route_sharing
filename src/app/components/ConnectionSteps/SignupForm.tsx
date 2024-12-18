"use client";

import React, { useState } from "react";
import SignUpFormProps from "@/app/types/props/SignUpFormProps";

const SignUpForm: React.FC<SignUpFormProps> = ({ onContinue }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue(fullName, email, password); // מעביר את הנתונים לקומפוננטת ההשלמה
  };

  return (
    <form dir="rtl" className="space-y-4" onSubmit={handleSubmit}>
      <fieldset className="border border-gray-300 p-2 rounded-lg">
        <legend className="text-md font-medium text-gray-700 px-2">
          שם מלא
        </legend>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="focus:outline-none focus:border-none w-full bg-none"
        />
      </fieldset>
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
          className="focus:outline-none focus:border-none w-full"
        />
      </fieldset>
      <button
        type="submit"
        className="w-full px-4 py-2 font-semibold text-black border-2 border-blue-400 rounded-md hover:shadow-md focus:outline-none focus:ring-offset-2 flex items-center justify-center"
      >
        המשך
      </button>
    </form>
  );
};

export default SignUpForm;
