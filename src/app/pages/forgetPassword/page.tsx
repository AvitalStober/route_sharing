// 'use client'
// import { verifyEmailAndSendOTP, verifyOTP } from "@/app/services/userService";
// import { useState } from "react";

// const ForgetPassword = () => {
//     const [email, setEmail] = useState("");
//     const [otp, setOtp] = useState("");
//     const [step, setStep] = useState(1); // 1 = הזנת מייל, 2 = הזנת OTP
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleEmailSubmit = async () => {
//         setLoading(true);
//         setError("");

//         try {
//             const response = await verifyEmailAndSendOTP(email);

//             if (response) {
//                 setStep(2); // מעבר לשלב הזנת ה-OTP
//             } else {
//                 setError("Failed to send OTP. Please try again.");
//             }
//         } catch (err) {
//             setError("An error occurred. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleOtpSubmit = async () => {
//         setLoading(true);
//         setError("");

//         try {
//             const response = await verifyOTP(email, otp);
//             if (response) {
//                 //כאן אני רוצה שיעבור לשלב 3 שהוא בחירת סיסמא חדשה ושליחה לעדכון
//             } else {
//                 setError("Invalid OTP. Please try again.");
//             }
//         } catch (err) {
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
//             ) : (
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
//             )}
//         </div>
//     );
// };

// export default ForgetPassword;


'use client'
import { editPassword, verifyEmailAndSendOTP, verifyOTP } from "@/app/services/userService";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ForgetPassword = () =>{
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
            const response = await verifyEmailAndSendOTP(email);

            if (response) {
                setStep(2); // מעבר לשלב הזנת ה-OTP
            } else {
                setError("Failed to send OTP. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await verifyOTP(email, otp);
            if (response) {
                setStep(3); // מעבר לשלב הזנת סיסמא חדשה
            } else {
                setError("Invalid OTP. Please try again.");
            }
        } catch (err) {
            console.error(err);
            
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleNewPasswordSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await editPassword(email, newPassword);
            if (response) {
                alert("סיסמא עודכנה בהצלחה");
                router.push("/pages/login");
            } else {
                setError("Failed to update password. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            {step === 1 ? (
                <>
                    <h2 className="text-xl font-semibold mb-4">Verify Your Email</h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
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
                    <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
                    <p className="mb-4 text-gray-600">We have sent an OTP to your email.</p>
                    <input
                        type="text"
                        placeholder="Enter OTP"
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
                    <h2 className="text-xl font-semibold mb-4">Choose a New Password</h2>
                    <input
                        type="password"
                        placeholder="Enter new password"
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
}

export default ForgetPassword;