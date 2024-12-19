// "use client";

// import React, { useState } from "react";
// import SignUpFormProps from "@/app/types/props/SignUpFormProps";
// import { z } from 'zod';

// const passwordSchema = z
//   .string()
//   .min(6, "Password must be at least 6 characters long")
//   .regex(
//     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
//     "Password must contain at least one letter, one number, and one special character");

// const nameSchema = z
//   .string()
//   .min(2, "Name must be at least 2 characters long")
//   .regex(/^[A-Za-zא-ת\s]+$/, "Name must contain only letters and spaces");

// const emailSchema = z
//   .string()
//   .email("Invalid email address");



// const SignUpForm: React.FC<SignUpFormProps> = ({ onContinue }) => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       emailSchema.parse(email);
//       nameSchema.parse(fullName);
//       passwordSchema.parse(password);

//       setErrorMessage(null); 
//       onContinue(fullName, email, password); 
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         setErrorMessage(error.errors[0].message);
//       } else {
//         setErrorMessage("An unexpected error occurred.");
//       }
//     }

//   };

//   return (
//     <form className="space-y-4" onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//           Full Name
//         </label>
//         <input
//           id="fullName"
//           type="text"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//           className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div>
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//           Email
//         </label>
//         <input
//           id="email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div>
//         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//           Password
//         </label>
//         <input
//           id="password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         Continue
//       </button>
//     </form>
//   );
// };

// export default SignUpForm;

'use client';

import React, { useState, useEffect } from "react";
import SignUpFormProps from "@/app/types/props/SignUpFormProps";
import { z } from 'zod';

const emailSchema = z
  .string()
  .email("כתובת אימייל שגויה");
  
const passwordSchema = z
  .string()
  .min(6, "סיסמא חייבת להכיל לפחות 6 תוים")
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    "סיסמא חייבת להכיל אות, סיפרה ותו מיוחד"
  );

const nameSchema = z
  .string()
  .min(2, "שם חייב להכיל לפחות 2 תוים")
  .regex(/^[A-Za-zא-ת\s]+$/, "שם חייב להכיל רק אותיות ורווחים");

const SignUpForm: React.FC<SignUpFormProps> = ({ onContinue }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setErrorMessage(null);
  }, [fullName, email, password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      emailSchema.parse(email);
      nameSchema.parse(fullName);
      passwordSchema.parse(password);

      setErrorMessage(null);
      onContinue(fullName, email, password);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorMessage(error.errors[0].message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }

  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errorMessage && errorMessage.includes("Name") && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errorMessage && errorMessage.includes("Invalid email") && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errorMessage && errorMessage.includes("Password") && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Continue
      </button>
    </form>
  );
};

export default SignUpForm;
