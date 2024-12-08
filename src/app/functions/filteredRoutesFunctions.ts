import {
  getRoutesByOwnerId,
  getRoutesInYourArea,
} from "@/app/services/routeService";
import User from "@/app/types/users";
import Route from "@/app/types/routes";
import { getUserToken, fetchUserById } from "@/app/functions/usersFunctions";
import { fetchRouteById } from "@/app/functions/routesFunctions";

export const fetchHistoryRoutes = async (
  setSelectedRoute: React.Dispatch<React.SetStateAction<string | null>>,
  setRoutes: React.Dispatch<React.SetStateAction<Route[]>>
): Promise<void> => {
  const userToken = getUserToken();
  if (!userToken) {
    console.error("No user token found");
    return;
  }

  const user: User | undefined = await fetchUserById(userToken);
  setSelectedRoute("history");
  if (!user) {
    console.error("User not found");
    return;
  }

  const historyRoutes: Route[] = []; // מערך שיכיל את כל המסלולים המלאים

  for (const routeId of user.historyRoutes) {
    const route: Route | undefined = await fetchRouteById(routeId.toString());

    if (route) {
      historyRoutes.push(route); // מוסיף את המסלול המלא
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
  const userToken = getUserToken();
  if (!userToken) {
    console.error("No user token found");
    return;
  }

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
  const userToken = getUserToken();
  if (!userToken) {
    console.error("No user token found");
    return;
  }

  const user: User | undefined = await fetchUserById(userToken);
  setSelectedRoute("routes");
  if (!user) {
    console.error("User not found");
    return;
  }
  console.log(user.address);

  setRoutes(await getRoutesInYourArea(user.address));
};
