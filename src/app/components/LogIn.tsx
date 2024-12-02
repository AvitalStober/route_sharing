"use client";
import React from "react";

interface LogInProps {
  age: string;
  address: string;
}

const LogIn: React.FC<LogInProps> = ({ age, address }) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">ברוך הבא!</h2>
      <p className="text-gray-700 text-center">גיל: {age}</p>
      <p className="text-gray-700 text-center">כתובת: {address}</p>
    </div>
  );
};

export default LogIn;
