import axios from "axios";
import IUser from "../types/users";
import useStore from "@/app/store/store";
import { jwtDecode } from "jwt-decode";
import { Token } from "../types/storeState";
// import IRoute from "../types/routes";

const url = "http://localhost:3000";
// const url = "https://route-sharing-bsd7.vercel.app";

export const signupFunction = async (
  fullName: string,
  email: string,
  password: string,
  age: number,
  address: string,
  googleUser: boolean
): Promise<IUser | null> => {
  return await axios
    .post(`${url}/api/signup`, {
      fullName,
      email,
      password,
      age,
      address,
      googleUser,
    })
    .then((response) => {
      const { setToken } = useStore.getState();

      // פענוח התוקן
      const decodedToken = jwtDecode<Token>(response.data.token);

      const userToken = {
        id: decodedToken.id,
        email: decodedToken.email,
        name: decodedToken.name,
      };

      setToken(userToken);
      return response.data;
    })
    .catch((error) => {
      console.error("Signup error:", error);
      return null;
    });
};

export const loginFunction = async (
  email: string,
  password: string
): Promise<Token | null> => {
  return await axios
    .post(`${url}/api/login`, { email, password })
    .then((response) => {
      const { setToken } = useStore.getState();

      // פענוח התוקן
      const decodedToken = jwtDecode<Token>(response.data.token);
      console.log("decodedToken", decodedToken.id);

      const userToken = {
        id: decodedToken.id,
        email: decodedToken.email,
        name: decodedToken.name,
      };

      setToken(userToken);
      return response.data;
    })
    .catch((error) => {
      console.error("Login error:", error.response?.data || error.message);
      return null;
    });
};

// export const addUser = async (newUser: IUser) => {
//   try {
//     const response = await axios.post(`${url}/api/users`, newUser);
//     return response.data;
//   } catch (error) {
//     console.error("Error adding user:", error);
//     throw error;
//   }
// };

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${url}/api/users`);
    return response.data;
  } catch (error) {
    console.error("Error get users:", error);
    throw error;
  }
};

export const getUserById = async (userId: string) : Promise<IUser | null> => {
  try {
    const response = await axios.get(`${url}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error; // ניתן לזרוק את השגיאה או להחזיר ערך ריק לטיפול ברמת הקריאה
  }
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
    const response = await axios.put('/api/signup', 
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
