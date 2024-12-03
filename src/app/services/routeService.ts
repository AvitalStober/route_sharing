import axios from "axios";
import Route from "../types/users";

// const url = "http://localhost:3000";
const url = "https://route-sharing-bsd7.vercel.app";
export const addRoute = async (newRoute: Route) => {
  try {
    const response = await axios.post(`${url}/api/routes`, newRoute);
    return response.data;
  } catch (error) {
    console.error("Error adding route:", error);
    throw error;
  }
};

export const getAllRoutes = async () => {
  try {
    const response = await axios.get(`${url}/api/routes`);
    return response.data;
  } catch (error) {
    console.error("Error get routes:", error);
    throw error;
  }
};

export const getRoutesByOwner = async (ownerId: string) => {
  try {
    if (ownerId) {
      console.error("Owner ID is missing from the token");
      return; 
    }
    const response = await axios.get(`${url}/api/routes/${ownerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching routes by owner:", error);
    throw error;
  }
};
