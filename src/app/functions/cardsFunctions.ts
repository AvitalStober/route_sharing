import { addHistoryRoute } from "@/app/services/userService";
const userTokenFromStorage = localStorage.getItem("userToken");
const userToken = JSON.parse(userTokenFromStorage!);
export const addRouteToHistoryRoute = (routeId: string) => {
  addHistoryRoute(userToken.id, routeId);
};
