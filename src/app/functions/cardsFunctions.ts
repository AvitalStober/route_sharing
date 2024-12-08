import { addHistoryRoute } from "@/app/services/userService";
import { getUserToken } from "@/app/functions/usersFunctions";
import { editRoutes } from "../services/routeService";

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
  const updateRate = await editRoutes(routeId, newRate);
  return updateRate;
};
