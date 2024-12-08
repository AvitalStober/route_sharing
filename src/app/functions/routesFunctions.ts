import Route from "@/app/types/routes";
import { getRoutesById } from "../services/routeService";

export const fetchRouteById = async (routeId: string) => {
  try {
    const route: Route = await getRoutesById(routeId);
    return route;
  } catch (error) {
    console.error("Error fetching route data:", error);
  }
};
