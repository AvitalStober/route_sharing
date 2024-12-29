import Route from "@/app/types/routes";
import { getCountOfRoutes, getRoutesById } from "../services/routeService";
import IRoute from "@/app/types/routes";
import useStore from "@/app/store/store";
import { getMeter } from "../services/distanceService";

export const appendRoutes = (newRoutes: IRoute[]) => {
  const state = useStore.getState(); 
  const Routes = state.Routes;
  const setRoutes = state.setRoutes;
  if (newRoutes.length !== 0) {
    const newArray: IRoute[] = [...Routes, ...newRoutes];
    setRoutes(newArray);
  }
};

export const fetchRouteById = async (routeId: string) => {
  try {
    const route: Route = await getRoutesById(routeId);
    return route;
  } catch (error) {
    console.error("Error fetching route data:", error);
  }
};

export const fetchCountOfRoutes = async () => {
  try {
    const routesCounter = await getCountOfRoutes();
    return routesCounter;
  } catch (error) {
    console.error("Error getting routes counter:", error);
  }
};

export const fetchCountOfKilometers = async () => {
  try {
    const kilometersCounter = await getMeter();
    
    return (kilometersCounter.totalKilometers)/1000;
  } catch (error) {
    console.error("Error getting kilometers counter:", error);
  }
};