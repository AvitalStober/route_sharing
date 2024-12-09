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
  console.log(routeId, newRate);
  const updateRate = await editRoutes(routeId, newRate);
  return updateRate;
};

// cardsFunctions.ts

export const handleStarClick = async (
  routeId: string,
  new_rate: number,
  selectedRatings: { [routeId: string]: number },
  filtered: number,
  setSelectedRatings: React.Dispatch<React.SetStateAction<{ [routeId: string]: number }>>
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
