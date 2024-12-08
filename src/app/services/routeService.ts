import axios from "axios";
import PartialRoute from "../types/RouteAddingProps";

const url = "http://localhost:3000";
// const url = "https://route-sharing-bsd7.vercel.app";

export const addRoute = async (newRoute: PartialRoute) => {
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

export const editRoutes = async (routeId: string, rate: number) => {
  try {
    const response = await axios.put(`${url}/api/routesByAddress/${routeId}`, { rate });
    console.log('Route updated:', response.data);
  } catch (error) {
    console.error('Error updating route:', error);
  }
};
