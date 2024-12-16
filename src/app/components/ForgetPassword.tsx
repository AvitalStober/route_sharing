import React, { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';

const emailSchema = z.string().email('Invalid email address');
const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*]/, 'Password must contain at least one special character');

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Request OTP, 2: Verify OTP & Reset Password
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleRequestOtp = async () => {
        try {
            setError('');
            setMessage('');
    
            // Validate email
            emailSchema.parse(email);
    
            // Send request
            const response = await axios.post('/api/auth/forgot-password', { email });
    
            setMessage(response.data.message || 'OTP sent to your email');
            setStep(2);
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.errors[0].message); // Show the first validation error
            } else if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || 'Failed to send OTP');
            } else if (err instanceof Error) {
                setError(err.message || 'Something went wrong');
            } else {
                setError('Unexpected error occurred');
            }
        }
    };
    
    const handleVerifyOtpAndReset = async () => {
        try {
            setError('');
            setMessage('');
    
            // Validate passwords
            passwordSchema.parse(newPassword);
    
            if (newPassword !== confirmPassword) {
                throw new Error('Passwords do not match');
            }
    
            // Send request
            const response = await axios.post('/api/auth/reset-password', {
                email,
                otp,
                newPassword,
            });
    
            setMessage(response.data.message || 'Password reset successful. You can now log in.');
            setStep(1);
            setEmail('');
            setOtp('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.errors[0].message); // Show the first validation error
            } else if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || err.message || 'Failed to reset password');
            } else {
                setError('Unexpected error occurred');
            }
        }
    };
    

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
            <h1>Forgot Password</h1>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {step === 1 && (
                <>
                    <label>
                        Enter your email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
                        />
                    </label>
                    <button onClick={handleRequestOtp} style={{ padding: '0.5rem 1rem' }}>
                        Request OTP
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <label>
                        Enter the OTP sent to your email:
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
                        />
                    </label>
                    <label>
                        Enter new password:
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
                        />
                    </label>
                    <label>
                        Confirm new password:
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
                        />
                    </label>
                    <button onClick={handleVerifyOtpAndReset} style={{ padding: '0.5rem 1rem' }}>
                        Reset Password
                    </button>
                </>
            )}
        </div>
    );
};

export default ForgotPassword;
