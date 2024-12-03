'use client'

import SignUpForm from '@/app/components/Connection steps/SignupForm';
import React, { useState } from 'react';
import { signupFunction } from '@/app/services/userService';
import GoogleSignInButton from '@/app/components/Connection steps/GoogleButton';
import SomeDatails from '@/app/components/Connection steps/SomeDetails';
import { useRouter } from "next/navigation";


const Signup = () => {

    const router = useRouter();

    const [userData, setUserData] = useState<{ fullName: string; email: string; password: string; } | null>(null);

    const handleSignUp = (fullName: string, email: string, password: string) => {
        setUserData({ fullName, email, password }); // מעדכן את ה-state
    };

    const handleCompleteDetails = async (age: number, address: string) => {
        if (userData?.fullName && userData.email && userData.password) {
            console.log(userData, age, address);

            try {
                const token = await signupFunction(userData?.fullName, userData?.email, userData?.password, age, address, false);
                console.log(token);
                if (token) {
                    router.push("/");
                }
            } catch {
                console.error("Failed to connect");
            }

        }
    }


    return (
        <div>
            {userData ? (
                <SomeDatails onSubmit={handleCompleteDetails} /> // אם יש userData, מציגים טופס להשלמת פרטים
            ) : (
                <div className="flex min-h-screen items-center justify-center bg-gray-100">
                    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
                        <SignUpForm onContinue={handleSignUp} />
                        <div className="text-center">
                            <GoogleSignInButton />
                        </div>
                        <p className="mt-2 text-gray-700">
                            Don&apos;t have an account? <a href="./login" className="text-blue-500">Login</a>
                        </p>
                    </div>
                </div>

            )}
        </div>
    );
}

export default Signup;