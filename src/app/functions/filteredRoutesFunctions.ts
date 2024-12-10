import {
  getRoutesByOwnerId,
  getRoutesInYourArea,
} from "@/app/services/routeService";
import User from "@/app/types/users";
import Route from "@/app/types/routes";
import {
  getUserToken,
  fetchUserById,
  getUserAddress,
} from "@/app/functions/usersFunctions";
import { fetchRouteById } from "@/app/functions/routesFunctions";

export const fetchHistoryRoutes = async (
  setSelectedRoute: (route: string | null) => void, // פונקציה פשוטה לעדכון סטייט
  setRoutes: (routes: Route[]) => void // פונקציה פשוטה לעדכון רשימת ה-Routes
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
  setSelectedRoute: (route: string | null) => void, // פונקציה פשוטה לעדכון סטייט
  setRoutes: (routes: Route[]) => void // פונקציה פשוטה לעדכון רשימת ה-Routes
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
  setSelectedRoute: (route: string | null) => void, // פונקציה פשוטה לעדכון סטייט
  setRoutes: (routes: Route[]) => void // פונקציה פשוטה לעדכון רשימת ה-Routes
): Promise<void> => {
  setSelectedRoute("routes");
  try {
    const address = await getUserAddress();
    const routes = await getRoutesInYourArea(address as string);
    setRoutes(routes); // קריאה לפונקציה לעדכון הסטייט ב-Zustand
  } catch (error) {
    console.log(error);
  }
};

export const fetchRoutesByChoosingArea = async (
  // setSelectedRoute: (route: string | null) => void, // פונקציה פשוטה לעדכון סטייט
  setRoutes: (routes: Route[]) => void, // פונקציה פשוטה לעדכון רשימת ה-Routes
  routesInChosenArea: Route[]
): Promise<void> => {
  // setSelectedRoute("routes");
  try {
    // const routes = await getRoutesInChosenArea(routesInChosenArea);
    setRoutes(routesInChosenArea); // קריאה לפונקציה לעדכון הסטייט ב-Zustand
    
  } catch (error) {
    console.log(error);
  }
};
