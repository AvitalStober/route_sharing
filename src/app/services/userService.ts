import axios from "axios";
import IUser from "../types/users";
import useStore from "@/app/store/store";
import { jwtDecode } from "jwt-decode";
import { Token } from "../types/storeState";

// const url = "http://localhost:3000";
const url = "https://route-sharing-bsd7.vercel.app";

export const signupFunction = async (
  fullName: string,
  email: string,
  password: string,
  address: string,
  googleUser: boolean
): Promise<IUser | null> => {
  return await axios
    .post(`${url}/api/signup`, {
      fullName,
      email,
      password,
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
      if (typeof window !== "undefined") {
        localStorage.setItem("userToken", JSON.stringify(userToken));
      }
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
): Promise<IUser | null> => {
  return await axios
    .post(`${url}/api/login`, { email, password })
    .then((response) => {
      const { setToken } = useStore.getState();

      const decodedToken = jwtDecode<Token>(response.data.token);
      console.log("decodedToken", decodedToken.id);

      const userToken = {
        id: decodedToken.id,
        email: decodedToken.email,
        name: decodedToken.name,
      };

      setToken(userToken);
      if (typeof window !== "undefined") {
        localStorage.setItem("userToken", JSON.stringify(userToken));
      }
      return response.data;
    })
    .catch((error) => {
      console.error("Login error:", error.response?.data || error.message);
      return null;
    });
};


export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${url}/api/users`);
    return response.data;
  } catch (error) {
    console.error("Error get users:", error);
    throw error;
  }
};

export const getUserById = async (userId: string) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const addHistoryRoute = async (userId: string, routeId: string) => {
  try {
    const response = await fetch(`/api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, routeId }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Route added successfully:", data);
      return data; // החזרת התשובה (אם צריך להשתמש בה מאוחר יותר)
    } else {
      console.error("Error adding route:", data.message);
      throw new Error(data.message); // טיפול בשגיאה
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("Failed to add route");
  }
};

export const putUserRouteRate = async (
  userId: string,
  routeId: string,
  rateRoute: number
) => {
  try {
    const response = await axios.put(`${url}/api/users/historyRateRoute/${userId}`, {
      routeId,
      rateRoute,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating route:", error);
  }
};

export const putUserDetails = async (
  userId: string,
  userDetails: {
    fullName: string;
    email: string;
    address: string;
  }
) => {
  try {
    const response = await axios.put(`${url}/api/users/${userId}`, {
      userDetails,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating route:", error);
  }
};

export const verifyEmailAndSendOTP = async(email: string) =>{
  try{
    const response = axios.post(`${url}/api/forgetPassword`, {email});
    return response;
  }catch(error){
    console.error(error)
  }
};

export const verifyOTP = async(email: string, otp: string) =>{
  try{
    const response = axios.put(`${url}/api/forgetPassword`, {email, otp});
    return response;
  }catch(error){
    console.error(error)
  }
}

export const editPassword = async(email: string, newPassword: string) =>{
  try{
    const response = axios.put(`${url}/api/forgetPassword`, {email, password: newPassword});
    return response;
  }catch(error){
    console.error(error)
  }
}
