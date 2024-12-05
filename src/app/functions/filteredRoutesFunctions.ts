import { getUserById } from "@/app/services/userService";
import {
  getRoutesById,
  getRoutesByOwnerId,
  getRoutesInYourArea,
} from "@/app/services/routeService";
import User from "@/app/types/users";
import Route from "@/app/types/routes";

const userTokenFromStorage = localStorage.getItem("userToken");
const userToken = JSON.parse(userTokenFromStorage!);

export const fetchHistoryRoutes = async (
  setSelectedRoute: React.Dispatch<React.SetStateAction<string | null>>,
  setRoutes: React.Dispatch<React.SetStateAction<Route[]>>
): Promise<void> => {
  const user: User | undefined = await fetchUserById();
  setSelectedRoute("history");
  if (!user) {
    console.error("User not found");
    return;
  }
  console.log(user);

  const historyRoutes: Route[] = [];  // מערך שיכיל את כל המסלולים המלאים

  for (const routeId of user.historyRoutes) {
    const route: Route | undefined = await fetchRouteById(routeId.toString());

    if (route) {
      historyRoutes.push(route);  // מוסיף את המסלול המלא
      console.log(historyRoutes);
    }
  }

  const flattenedRoutes = historyRoutes.flat();

  console.log(flattenedRoutes);  
  setRoutes(flattenedRoutes);  
};

export const FetchOwnerRoutes = async (
  setSelectedRoute: React.Dispatch<React.SetStateAction<string | null>>,
  setRoutes: React.Dispatch<React.SetStateAction<Route[]>>
): Promise<void> => {
  setSelectedRoute("myRoutes");
  try {
    const ownerR = await getRoutesByOwnerId(userToken.id);
    setRoutes(ownerR);
  } catch (error) {
    console.error("Error fetching user routes:", error);
  }
};

export const fetchRoutesInYourArea = async (
  setSelectedRoute: React.Dispatch<React.SetStateAction<string | null>>,
  setRoutes: React.Dispatch<React.SetStateAction<Route[]>>
): Promise<void> => {
  const user: User | undefined = await fetchUserById();
  setSelectedRoute("routes");
  if (!user) {
    console.error("User not found");
    return undefined;
  }
  console.log(user.address);
  
  setRoutes(await getRoutesInYourArea(user.address));
};

export const fetchUserById = async () => {
  try {
    const user: User = await getUserById(userToken.id);
    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const fetchRouteById = async (routeId: string) => {
  try {
    const route: Route = await getRoutesById(routeId);
    return route;
  } catch (error) {
    console.error("Error fetching route data:", error);
  }
};