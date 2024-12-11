import {
  getRoutesByOwnerId,
  getRoutesInYourArea,
} from "@/app/services/routeService";
import Route from "@/app/types/routes";
import {
  getUserToken,
  fetchUserById,
  getUserAddress,
} from "@/app/functions/usersFunctions";
import { fetchRouteById } from "@/app/functions/routesFunctions";

// export const fetchHistoryRoutes = async (
//   setSelectedRoute: (route: string | null) => void,
//   setRoutes: (routes: { routeId: Types.ObjectId; rateRoute: number }[]) => void
// ): Promise<void> => {
//   const userToken = getUserToken();
//   if (!userToken) {
//     console.error("No user token found");
//     return;
//   }

//   const user: User | undefined = await fetchUserById(userToken);
//   setSelectedRoute("history");
//   if (!user) {
//     console.error("User not found");
//     return;
//   }

//   const historyRoutes: { routeId: Types.ObjectId; rateRoute: number }[] = [];

//   for (const routeId of user.historyRoutes) {
//     let validRouteId: Types.ObjectId;
//     if (routeId instanceof mongoose.Types.ObjectId) {
//       validRouteId = routeId;
//     } else if (typeof routeId === "string") {
//       try {
//         validRouteId = new mongoose.Types.ObjectId(routeId);
//       } catch (error) {
//         console.error(`Invalid routeId: ${routeId}`, error);
//         continue;
//       }
//     } else {
//       console.error(`Unsupported routeId type: ${typeof routeId}`);
//       continue;
//     }

//     const route: Route | undefined = await fetchRouteById(validRouteId.toHexString());
//     if (route) {
//       historyRoutes.push({ routeId: validRouteId, rateRoute: 0 });
//     }
//   }

//   setRoutes(historyRoutes);
// };

export const fetchHistoryRoutes = async (
  setSelectedRoute: (route: string | null) => void,
  setRoutes: (routes: Route[]) => void
): Promise<void> => {
  setSelectedRoute("history");
  const user = await fetchUserById();

  if (!user) {
    console.error("User not found");
    return;
  }

  const userRoutes = user.historyRoutes;
  const historyRoutes: Route[] = [];
  for (const historyRoute of userRoutes) {
    const routeId = historyRoute.routeId;
    const route: Route | undefined = await fetchRouteById(routeId.toString());
    if (route) {
      historyRoutes.push(route);
    }
  }
  const flattenedRoutes = historyRoutes.flat();
  setRoutes(flattenedRoutes);
};

export const FetchOwnerRoutes = async (
  setSelectedRoute: (route: string | null) => void, // פונקציה פשוטה לעדכון סטייט
  setRoutes: (routes: Route[]) => void // פונקציה פשוטה לעדכון רשימת ה-Routes
): Promise<void> => {
  setSelectedRoute("myRoutes");
  const userToken = getUserToken();
  if (!userToken) {
    console.error("No user token found");
    return;
  }

  try {
    const ownerR = await getRoutesByOwnerId(userToken.id);

    setRoutes(ownerR);
  } catch (error) {
    console.error("Error fetching user routes:", error);
  }
};

export const fetchRoutesInYourArea = async (
  setRoutes: (routes: Route[]) => void,
  setSelectedRoute?: (route: string | null) => void,
  areaAddress?: string
): Promise<void> => {
  if (setSelectedRoute) setSelectedRoute("routes");
  try {
    let routes;
    if (!areaAddress) {
      const address = await getUserAddress();
      routes = await getRoutesInYourArea(address as string);
    } else {
      routes = await getRoutesInYourArea(areaAddress as string);
    }
    setRoutes(routes);
  } catch (error) {
    console.error(error);
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
    console.error(error);
  }
};
