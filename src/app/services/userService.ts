import axios from "axios";
import IUser from "../types/users";
import IRoute from "../types/routes";

const url = "http://localhost:3000";
// const url = "https://route-sharing-bsd7.vercel.app";

export const signupFunction = (fullName: string, email: string, password: string, age: number, address: string, googleUser:boolean, historyRoutes:[IRoute] | []): Promise<IUser | null> => {
    
    return axios
        .post(`${url}/api/signup`, {
            fullName,
            email,
            password,
            age,
            address,
            googleUser,
            historyRoutes,
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


export const updateUserData = async (token: string, password?: string, age?: number, fullName?: string, address?: string, historyRoutes: string[] = []) => {
  try {
    // יצירת אובייקט שמכיל רק את השדות שצורפו
    const updateData: { [key: string]: any } = {};

    if (password) updateData.password = password;
    if (age) updateData.age = age;
    if (fullName) updateData.fullName = fullName;
    if (address) updateData.address = address;
    if (historyRoutes.length > 0) updateData.historyRoutes = historyRoutes;

    // אם אין שום שדה לעדכן, מחזירים שגיאה
    if (Object.keys(updateData).length === 0) {
      throw new Error('No fields to update');
    }

    // שליחת הבקשה לשרת
    const response = await axios.put('/api/user/update', 
      updateData,
      {
        headers: {
          'Authorization': `Bearer ${token}`, // שליחה עם הטוקן בהדרס
          'Content-Type': 'application/json'
        }
      }
    );

    // טיפול בתשובה
    console.log('User updated successfully:', response.data);
    return response.data;

  } catch (error: any) {
    console.error('Error in updateUserData:', error);
    if (error.response) {
      // אם יש תשובת שגיאה מהשרת
      throw new Error(error.response.data.error || 'Failed to update user');
    } else {
      // אם יש שגיאה כללית
      throw new Error('Internal server error');
    }
  }
};
