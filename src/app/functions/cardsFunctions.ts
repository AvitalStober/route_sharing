import { addHistoryRoute } from "@/app/services/userService";
import {
  fetchUserById,
  getUserToken,
  putUserRate,
} from "@/app/functions/usersFunctions";
import { editRoutes } from "../services/routeService";
import { fetchRouteById } from "./routesFunctions";
import IRoute from "../types/routes";
import { Types } from "mongoose";

export const addRouteToHistoryRoute = (routeId: string) => {
  const userToken = getUserToken();

  if (!userToken) {
    console.error("User token not found. Cannot add route to history.");
    return;
  }

  addHistoryRoute(userToken.id, routeId)
    .then(() => {
      console.log(`Route ${routeId} successfully added to history.`);
    })
    .catch((error) => {
      console.error("Error adding route to history:", error);
    });
};

export const raiting = async (routeId: string, newRate: number) => {
  console.log("raiting");

  if (!routeId || !newRate) return null;
  const updateRate = await editRoutes(routeId, newRate);
  await putUserRate(routeId, newRate);
  return updateRate;
};

export const handleStarClick = async (
  routeId: string,
  new_rate: number,
  selectedRatings: { [routeId: string]: number },
  filtered: number,
  setSelectedRatings: React.Dispatch<
    React.SetStateAction<{ [routeId: string]: number }>
  >
) => {
  if (selectedRatings[routeId]) return;

  console.log("Clicked star:", new_rate);

  if (filtered === 2) {
    await raiting(routeId, new_rate);
    setSelectedRatings((prev) => ({
      ...prev,
      [routeId]: new_rate,
    }));
  }
};

export const getUserRouteRate = async (routeId: string) => {
  const user = await fetchUserById(); // משיג את המשתמש
  if (!user) {
    console.error("User not found");
    return 0;
  }
  const historyRoute = user.historyRoutes.find(
    (route: { routeId: Types.ObjectId; rateRoute: number }) =>
      route.routeId.toString() === routeId
  );
  if (!historyRoute) {
    console.error("Route not found in user historyRoutes");
    return 0;
  }

  return historyRoute.rateRoute;
};
