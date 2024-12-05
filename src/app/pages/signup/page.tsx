'use client';

import React, { useEffect, useState } from 'react';
import SignUpForm from '@/app/components/SignupForm';
import { signupFunction, updateUserData } from '@/app/services/userService';
import GoogleSignInButton from '@/app/components/GoogleButton';
import SomeDatails from '@/app/components/SomeDetails';
import { useRouter } from "next/navigation";
import { decodeToken, verifyToken } from '@/app/functions/tokenFunction';

const Signup = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<{ fullName: string; email: string; password?: string; googleUser: boolean; token?: string | null } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleGoogle = async (token: string | null) => {
    const decode = decodeToken(token);
    setToken(token);
    if (decode) {
      setUserData({ fullName: decode.fullName, email: decode.email, password: undefined, googleUser: decode.googleUser, token });
    }

  }

  // פונקציה לעדכון המשתמש עם הטוקן אחרי ההתחברות בגוגל
  const handleSignUpGoogle = async () => {
    console.log(token, "google", userData);


    if (token) {
      try {
        console.log("Received token: ", token);
        const decode = verifyToken(token); // פענוח הטוקן
        console.log("Decoded token: ", decode);
        if (decode.new)
          setUserData({ fullName: decode.fullName, email: decode.email, password: undefined, googleUser: decode.googleUser, token });
        else
          router.push("/pages/home")
      } catch (error) {
        router.push("/pages/signup") // במקרה של שגיאה, נווט לעמוד הלוגין
      }
    }
  };

  // דואגים שhandleSignUpGoogle יקרא רק כשיש טוקן חדש
  useEffect(() => {
    if (token) {
      handleSignUpGoogle();
    }
  }, [token]);

  // פונקציה להרשמה באמצעות פרטי משתמש (לא גוגל)
  const handleSignUp = (fullName: string, email: string, password?: string) => {
    setUserData({ fullName, email, password, googleUser: false });
  };

  const handleCompleteDetails = async (age: number, address: string) => {
    if (!(userData?.googleUser)) {
      if (userData?.fullName && userData.email && userData.password && age && address) {
        console.log(userData, age, address);
        try {
          const token = await signupFunction(userData.fullName, userData.email, userData.password || '', age, address, userData.googleUser, []);
          if (token) {
            router.push("/"); // לאחר ההרשמה המוצלחת
          }
        } catch {
          console.error("Failed to connect");
        }
      }
    } else {
      if (userData?.fullName && userData.email && age && address && userData.token) {
        try {
          await updateUserData(userData.token, address, age);
        } catch {
          console.error("Failed to update user data");
        }
      }
    }
  };

  return (
    <div>
      {userData ? (
        <SomeDatails onSubmit={handleCompleteDetails} /> // הצגת פרטי משתמש נוספים
      ) : (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
            <SignUpForm onContinue={handleSignUp} />
            <div className="text-center">
              <GoogleSignInButton onSignIn={handleGoogle} />
            </div>
            <p className="mt-2 text-gray-700">
              Don&apos;t have an account? <a href="./login" className="text-blue-500">Login</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
