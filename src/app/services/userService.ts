import axios from "axios";
import IUser from "../types/users";

// const url = "http://localhost:3000";
const url = "https://users-bay.vercel.app";

export const signup = (username: string, email: string, password: string, age: number, address: string): Promise<IUser | null> => {
    return axios
        .post(`${url}/api/signup`, {
            username,
            email,
            password,
            age,
            address
        })
        .then(response => response.data) // במקרה של הצלחה, החזרת הנתונים מהשרת
        .catch(error => {
            console.error('Signup error:', error);
            return null;
        });
};


export const login = (email: string, password: string): Promise<IUser | null> => {
    return axios
        .post(`${url}/api/login`, { email, password })
        .then(response => response.data.user) 
        .catch(error => {
            console.error('Login error:', error.response?.data || error.message);
            return null; 
        });
};

export default login;

