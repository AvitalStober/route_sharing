import { addHistoryRoute } from "@/app/services/userService";
import {
  fetchUserById,
  getUserToken,
  putUserRate,
} from "@/app/functions/usersFunctions";
import { editRoutes } from "../services/routeService";
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

// export  const fetchRates = async (
//   Routes: IRoute[],
//   filtered:number,
//   routeId: string,
//   setRouteRates:( routeId: string[] )=>void,
// ): Promise<void> => {
//   const rates: Record<string, number> = {}; 
//   for (const route of Routes) {
//     if (filtered === 2) {
//       rates[routeId] = (await getUserRouteRate(route._id as string)) || 0; 
//     }
//   }
//   setRouteRates(rates);
// };
