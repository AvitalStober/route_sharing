import Route from "@/app/types/routes";
import { getRoutesById } from "../services/routeService";
import IRoute from "@/app/types/routes";
import useStore from "@/app/store/store";

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
