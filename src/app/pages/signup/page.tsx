'use client';

import React, { useEffect, useState } from 'react';
import SignUpForm from '@/app/components/ConnectionSteps/SignupForm';
import { getUserById, signupFunction, updateUserData } from '@/app/services/userService';
import GoogleSignInButton from '@/app/components/ConnectionSteps/GoogleButton';
import SomeDatails from '@/app/components/ConnectionSteps/SomeDetails';
import { useRouter } from "next/navigation";
import { decodeToken, verifyToken } from '@/app/functions/tokenFunction';

const Signup = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<{
    fullName: string;
    email: string;
    password?: string;
    googleUser: boolean;
  } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleGoogle = async (token: string | null) => {
    setToken(token);
    const decode = decodeToken(token);
    if (decode) {
      setUserData({fullName: decode.name,email: decode.email,password: undefined,googleUser: true,});
      console.log("connect to google");
      
    }
  };

  // פונקציה לעדכון המשתמש עם הטוקן אחרי ההתחברות בגוגל
  const handleSignUpGoogle = async () => {
    if (token) {
      try {
        console.log("Received token: ", token);
        const decode = verifyToken(token); // פענוח הטוקן
        console.log("Decoded token: ", decode);
        if (decode.id) {
          const user = await getUserById(decode.id);
          if (user && user.age && user.address) {
            router.push("/pages/home");
          } else {
            setUserData({
              fullName: decode.name,
              email: decode.email,
              password: undefined,
              googleUser: true,
            });
          }
        }
      } catch (error) {
        console.error("Error during Google Sign Up:", error);
        // איפוס המצב במידה ויש שגיאה
        setToken(null);
        setUserData(null);
      }
    }
  };

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
    if (!userData?.googleUser) {
      if (userData?.fullName && userData.email && userData.password && age && address) {
        try {
          const token = await signupFunction(userData.fullName, userData.email, userData.password || '', age, address, userData.googleUser);
          if (token) {
            router.push("/pages/home");
          }
        } catch {
          console.error("Failed to connect");
        }
      }
    } else {
      if (userData.email && age && address && token) {
        try {
          await updateUserData(token, address, age);
          router.push('/pages/home')
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
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Create an Account
            </h2>
            <SignUpForm onContinue={handleSignUp} />
            <div className="text-center">
              <GoogleSignInButton onSignIn={handleGoogle} />
            </div>
            <p className="mt-2 text-gray-700">
              Don&apos;t have an account?{" "}
              <a href="./login" className="text-blue-500">
                Login
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
