import User from "@/app/types/users";
import { getUserById } from "../services/userService";

export const getUserToken = (): {
  id: string;
  email: string;
  name: string;
} | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const userTokenFromStorage = localStorage.getItem("userToken");
  return userTokenFromStorage ? JSON.parse(userTokenFromStorage) : null;
};

export const fetchUserById = async (userToken: { id: string }) => {
  try {
    const user: User = await getUserById(userToken.id);
    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
