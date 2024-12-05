import axios from "axios";
import Route from "../types/users";

const url = "http://localhost:3000";
// const url = "https://route-sharing-bsd7.vercel.app";

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

export const getRoutesById = async (routeId: string | undefined) => {
  try {
    const response = await axios.get(`${url}/api/routes/${routeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching routes by route id:", error);
    throw error;
  }
};

export const getRoutesByOwnerId = async (ownerId: string | undefined) => {
  try {
    const response = await axios.get(`${url}/api/routes/ownerId/${ownerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching routes by owner id:", error);
    throw error;
  }
};

export const getRoutesInYourArea = async (address: string) => {
  try {
    const response = await axios.post(`${url}/api/routesByAddress`, { address });
    return response.data.routes; 
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw new Error("Could not fetch routes. Please try again later.");
  }
};

