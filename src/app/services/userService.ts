import axios from "axios";
import IUser from "../types/users";

// const url = "http://localhost:3000";
const url = "https://route-sharing-bsd7.vercel.app";

export const signupFunction = (fullName: string, email: string, password: string, age: number, address: string, googleUser:boolean): Promise<IUser | null> => {
    
    return axios
        .post(`${url}/api/signup`, {
            fullName,
            email,
            password,
            age,
            address,
            googleUser
        })
        .then(response => response.data) // במקרה של הצלחה, החזרת הנתונים מהשרת
        .catch(error => {
            console.error('Signup error:', error);
            return null;
        });
};


export const loginFunction = (email: string, password: string): Promise<IUser | null> => {
    return axios
        .post(`${url}/api/login`, { email, password })
        .then(response => response.data) 
        .catch(error => {
            console.error('Login error:', error.response?.data || error.message);
            return null; 
        });
};


