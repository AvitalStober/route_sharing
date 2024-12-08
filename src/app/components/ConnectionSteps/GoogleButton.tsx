'use client';

import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

interface GoogleSignInButtonProps {
  onSignIn: (token: string | null) => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onSignIn }) => {
  const [token, setToken] = useState<string | null>(null);

  // useEffect(() => {
  //   // עדכון הטוקן אם הוא קיים ב-session
  //   if (session?.user?.token) {
  //     setToken(session.user.token); // עדכון הסטייט עם הטוקן החדש
  //   }
  // }, [session]);

  useEffect(() => {
    // רק כשיש טוקן חדש, תשלח אותו לפונקציה
    if (token) {
      onSignIn(token); // שולח את הטוקן לפונקציה שקיבלת בפרופס
    }
  }, [token, onSignIn]);

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google"); // התחברות באמצעות גוגל
    } catch (error) {
      console.error("Google Sign-in failed", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="w-full px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignInButton;
