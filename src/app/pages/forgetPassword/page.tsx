// 'use client';
// import { editPassword, verifyEmailAndSendOTP, verifyOTP } from "@/app/services/userService";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const ForgetPassword = () => {
//     const [email, setEmail] = useState("");
//     const [otp, setOtp] = useState("");
//     const [newPassword, setNewPassword] = useState(""); // For entering new password
//     const [step, setStep] = useState(1); // 1 = הזנת מייל, 2 = הזנת OTP, 3 = הזנת סיסמא חדשה
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     const router = useRouter();

//     // בדיקת תקינות להזנת מייל
//     const isValidEmail = (email: string) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     // בדיקת תקינות להזנת סיסמה
//     const isValidPassword = (password: string) => {
//         return password.length >= 8 && /\d/.test(password) && /[!@#$%^&*]/.test(password);
//     };

//     const handleEmailSubmit = async () => {
//         setLoading(true);
//         setError("");

//         if (!isValidEmail(email)) {
//             setError("Please enter a valid email address.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await verifyEmailAndSendOTP(email);

//             if (response) {
//                 setStep(2); // מעבר לשלב הזנת ה-OTP
//             } else {
//                 setError("Failed to send OTP. Please try again.");
//             }
//         } catch (err) {
//             console.error(err);
//             setError("An error occurred. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleOtpSubmit = async () => {
//         setLoading(true);
//         setError("");

//         if (!otp.trim()) {
//             setError("Please enter the OTP sent to your email.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await verifyOTP(email, otp);
//             if (response) {
//                 setStep(3); // מעבר לשלב הזנת סיסמא חדשה
//             } else {
//                 setError("Invalid OTP. Please try again.");
//             }
//         } catch (err) {
//             console.error(err);
//             setError("An error occurred. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleNewPasswordSubmit = async () => {
//         setLoading(true);
//         setError("");

//         if (!isValidPassword(newPassword)) {
//             setError("Password must be at least 8 characters long, include a number and a special character.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await editPassword(email, newPassword);
//             if (response) {
//                 alert("סיסמא עודכנה בהצלחה");
//                 router.push("/pages/login");
//             } else {
//                 setError("Failed to update password. Please try again.");
//             }
//         } catch (err) {
//             console.error(err);
//             setError("An error occurred. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//             {step === 1 ? (
//                 <>
//                     <h2 className="text-xl font-semibold mb-4">Verify Your Email</h2>
//                     <input
//                         type="email"
//                         placeholder="Enter your email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//                     <button
//                         onClick={handleEmailSubmit}
//                         className={`w-full py-2 text-white rounded ${
//                             loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//                         }`}
//                         disabled={loading}
//                     >
//                         {loading ? "Sending..." : "Send OTP"}
//                     </button>
//                 </>
//             ) : step === 2 ? (
//                 <>
//                     <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
//                     <p className="mb-4 text-gray-600">We have sent an OTP to your email.</p>
//                     <input
//                         type="text"
//                         placeholder="Enter OTP"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//                     <button
//                         onClick={handleOtpSubmit}
//                         className={`w-full py-2 text-white rounded ${
//                             loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
//                         }`}
//                         disabled={loading}
//                     >
//                         {loading ? "Verifying..." : "Verify OTP"}
//                     </button>
//                 </>
//             ) : (
//                 <>
//                     <h2 className="text-xl font-semibold mb-4">Choose a New Password</h2>
//                     <input
//                         type="password"
//                         placeholder="Enter new password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//                     <button
//                         onClick={handleNewPasswordSubmit}
//                         className={`w-full py-2 text-white rounded ${
//                             loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
//                         }`}
//                         disabled={loading}
//                     >
//                         {loading ? "Updating..." : "Update Password"}
//                     </button>
//                 </>
//             )}
//         </div>
//     );
// };

// export default ForgetPassword;

'use client';
import { editPassword, verifyEmailAndSendOTP, verifyOTP } from "@/app/services/userService";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

// סכמות Zod
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

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState(""); // For entering new password
    const [step, setStep] = useState(1); // 1 = הזנת מייל, 2 = הזנת OTP, 3 = הזנת סיסמא חדשה
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleEmailSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            // אימות אימייל באמצעות Zod
            emailSchema.parse(email);

            const response = await verifyEmailAndSendOTP(email);
            if (response) {
                setStep(2); // מעבר לשלב הזנת ה-OTP
            } else {
                setError("שליחת קוד אימות נכשלה. נסה שנית");
            }
        } catch (err) {
            setError(err instanceof z.ZodError ? err.errors[0].message : "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async () => {
        setLoading(true);
        setError("");

        if (!otp.trim()) {
            setError("הקלד את קוד האימות שנשלח אליך במייל");
            setLoading(false);
            return;
        }

        try {
            const response = await verifyOTP(email, otp);
            if (response) {
                setStep(3); // מעבר לשלב הזנת סיסמא חדשה
            } else {
                setError("קוד אימות שגוי, נסה שנית");
            }
        } catch  {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleNewPasswordSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            // אימות סיסמה באמצעות Zod
            passwordSchema.parse(newPassword);

            const response = await editPassword(email, newPassword);
            if (response) {
                alert("סיסמא עודכנה בהצלחה");
                router.push("/pages/login");
            } else {
                setError("Failed to update password. Please try again.");
            }
        } catch (err) {
            setError(err instanceof z.ZodError ? err.errors[0].message : "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            {step === 1 ? (
                <>
                    <h2 className="text-xl font-semibold mb-4">אימות כתובת מייל</h2>
                    <input
                        type="email"
                        placeholder="הכנס אימייל"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        onClick={handleEmailSubmit}
                        className={`w-full py-2 text-white rounded ${
                            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send OTP"}
                    </button>
                </>
            ) : step === 2 ? (
                <>
                    <h2 className="text-xl font-semibold mb-4">הכנסת קוד אימות</h2>
                    <p className="mb-4 text-gray-600">We have sent an OTP to your email.</p>
                    <input
                        type="text"
                        placeholder="הכנס קוד אימות"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        onClick={handleOtpSubmit}
                        className={`w-full py-2 text-white rounded ${
                            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-xl font-semibold mb-4">בחירת סיסמא חדשה</h2>
                    <input
                        type="password"
                        placeholder="בחר סיסמא חדשה"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        onClick={handleNewPasswordSubmit}
                        className={`w-full py-2 text-white rounded ${
                            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </>
            )}
        </div>
    );
};

export default ForgetPassword;
