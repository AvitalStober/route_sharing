import axios from "axios";
import IUser from "../types/users";
import useStore from "@/app/store/store";
import { jwtDecode } from "jwt-decode";
import { Token } from "../types/storeState";

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
        address: decodedToken.address,
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
): Promise<IUser | null> => {
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
        address: decodedToken.address,
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
