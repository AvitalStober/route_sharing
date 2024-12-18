import User from "@/app/types/users";
import { getUserById, putUserRouteRate } from "../services/userService";

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

export const getUserAddress = async () => {
  debugger;
  try {
    const user: User | undefined = await fetchUserById();
    console.log("getUserAddress", user);
    debugger;

    if (!user) {
      // throw new Error("User not found");
      console.log("user not found");
      return;
    }
    return user.address;
  } catch (error) {
    console.log("Error fetching user address:", error);
    return null;
  }
};

export const fetchUserById = async () => {
  debugger;
  try {
    const userToken = getUserToken();
    if (!userToken) {
      console.log("No user token found");
      return;
    }
    const user: User = await getUserById(userToken.id);
    console.log("fetchUserById", user);
    debugger;

    return user;
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
};

export const putUserRate = async (routeId: string, rate: number) => {
  try {
    const userToken = getUserToken();
    if (!userToken) {
      console.error("No user token found");
      return;
    }

    const userRate = await putUserRouteRate(
      userToken.id as string,
      routeId,
      rate
    );
    return userRate;
  } catch (error) {
    console.error("Error updating user route rate:", error);
    throw new Error("Failed to update route rate");
  }
};
