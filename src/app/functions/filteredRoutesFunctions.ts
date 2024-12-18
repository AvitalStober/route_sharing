// import {
//   getRoutesByOwnerId,
//   getRoutesInYourArea,
// } from "@/app/services/routeService";
// import Route from "@/app/types/routes";
// import {
//   getUserToken,
//   fetchUserById,
//   getUserAddress,
// } from "@/app/functions/usersFunctions";
// import { fetchRouteById } from "@/app/functions/routesFunctions";

// export const fetchHistoryRoutes = async (
//   setSelectedRoute: (route: string | null) => void,
//   setRoutes: (routes: Route[]) => void,
//   appendRoutes: (routes: Route[]) => void // פונקציה שתוסיף מסלולים קיימים
// ): Promise<void> => {
//   setSelectedRoute("history");
//   const user = await fetchUserById();

//   if (!user) {
//     console.error("User not found");
//     return;
//   }

//   const userRoutes = user.historyRoutes;
//   const historyRoutes: Route[] = [];
//   for (const historyRoute of userRoutes) {
//     const routeId = historyRoute.routeId;
//     const route: Route | undefined = await fetchRouteById(routeId.toString());
//     if (route) {
//       historyRoutes.push(route);
//     }
//   }
//   const flattenedRoutes = historyRoutes.flat();
//   setRoutes(flattenedRoutes);
// };

// // export const FetchOwnerRoutes = async (
// //   setSelectedRoute: (route: string | null) => void, // פונקציה פשוטה לעדכון סטייט
// //   setRoutes: (routes: Route[]) => void // פונקציה פשוטה לעדכון רשימת ה-Routes
// // ): Promise<void> => {
// //   setSelectedRoute("myRoutes");
// //   const userToken = getUserToken();
// //   if (!userToken) {
// //     console.error("No user token found");
// //     return;
// //   }

// //   try {
// //     const ownerR = await getRoutesByOwnerId(userToken.id);

// //     setRoutes(ownerR);
// //   } catch (error) {
// //     console.error("Error fetching user routes:", error);
// //   }
// // };
// let currentPage = 1;

// export const FetchOwnerRoutes = async (
//   setSelectedRoute: (route: string | null) => void,
//   setRoutes: (routes: Route[]) => void,
//   appendRoutes: (routes: Route[]) => void // פונקציה שתוסיף מסלולים קיימים
// ): Promise<void> => {
//   setSelectedRoute("myRoutes");
//   const userToken = getUserToken();
//   if (!userToken) {
//     console.error("No user token found");
//     return;
//   }

//   try {
//     const response = await getRoutesByOwnerId(userToken.id, currentPage);

//     const { routes, currentPage: page } = response;
//     currentPage = page + 1;
//     console.log("routes to print", routes);

//     if (currentPage === 1) {
//       setRoutes(routes);
//     } else {
//       appendRoutes(routes);
//     }
//   } catch (error) {
//     console.error("Error fetching user routes:", error);
//   }
// };

// export const fetchRoutesInYourArea = async (
//   setRoutes: (routes: Route[]) => void,
//   setSelectedRoute?: (route: string | null) => void,
//   appendRoutes: (routes: Route[]) => void, // פונקציה שתוסיף מסלולים קיימים
//   areaAddress?: string
// ): Promise<void> => {
//   if (setSelectedRoute) setSelectedRoute("routes");
//   try {
//     let routes;
//     if (!areaAddress) {
//       const address = await getUserAddress();
//       routes = await getRoutesInYourArea(address as string);
//     } else {
//       routes = await getRoutesInYourArea(areaAddress as string);
//     }
//     setRoutes(routes);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const fetchRoutesByChoosingArea = async (
//   // setSelectedRoute: (route: string | null) => void, // פונקציה פשוטה לעדכון סטייט
//   setRoutes: (routes: Route[]) => void, // פונקציה פשוטה לעדכון רשימת ה-Routes
//   routesInChosenArea: Route[]
// ): Promise<void> => {
//   // setSelectedRoute("routes");
//   try {
//     // const routes = await getRoutesInChosenArea(routesInChosenArea);
//     setRoutes(routesInChosenArea); // קריאה לפונקציה לעדכון הסטייט ב-Zustand
//   } catch (error) {
//     console.error(error);
//   }
// };

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
import IRoute from "@/app/types/routes";

// משתנה גלובלי לשמירת הדף הנוכחי עבור כל פונקציה
let currentPageOwnerRoutes = 1;
let currentPageHistoryRoutes = 1;
let currentPageAreaRoutes = 1;

export const fetchHistoryRoutes = async (
  setSelectedRoute: (route: string | null) => void,
  setRoutes: (routes: Route[]) => void,
  appendRoutes: (routes: Route[]) => void // פונקציה שתוסיף מסלולים קיימים
): Promise<void> => {
  setSelectedRoute("history");

  const user = await fetchUserById();
  if (!user) {
    console.error("User not found");
    return;
  }

  const userRoutes = user.historyRoutes.slice(
    (currentPageHistoryRoutes - 1) * 10,
    currentPageHistoryRoutes * 10
  );
  const historyRoutes: Route[] = [];

  for (const historyRoute of userRoutes) {
    const routeId = historyRoute.routeId;
    const route: Route | undefined = await fetchRouteById(routeId.toString());
    if (route) {
      historyRoutes.push(route);
    }
  }

  if (currentPageHistoryRoutes === 1) {
    setRoutes(historyRoutes);
  } else {
    appendRoutes(historyRoutes);
  }

  currentPageHistoryRoutes++;
};

export const FetchOwnerRoutes = async (
  setSelectedRoute: (route: string | null) => void,
  setRoutes: (routes: Route[]) => void,
  appendRoutes: (routes: Route[]) => void // פונקציה שתוסיף מסלולים קיימים
): Promise<void> => {
  setSelectedRoute("myRoutes");
  const userToken = getUserToken();
  if (!userToken) {
    console.error("No user token found");
    return;
  }

  try {
    const response = await getRoutesByOwnerId(
      userToken.id,
      currentPageOwnerRoutes
    );
    const { routes, currentPage } = response;

    if (currentPageOwnerRoutes === 1) {
      setRoutes(routes);
    } else {
      appendRoutes(routes);
    }

    currentPageOwnerRoutes = currentPage + 1;
  } catch (error) {
    console.error("Error fetching user routes:", error);
  }
};

export const fetchRoutesInYourArea = async (
  setRoutes: (routes: Route[]) => void,
  setLastPage?: (lastPage: boolean) => void,
  appendRoutes?: (routes: Route[]) => void, // פונקציה שתוסיף מסלולים קיימים
  setSelectedRoute?: (route: string | null) => void,
  areaAddress?: string
): Promise<void> => {
  if (setSelectedRoute) setSelectedRoute("routes");
  try {
    let data: { routes: IRoute[]; lastPage: boolean };
    const userTokenFromStorage = localStorage.getItem("userToken");
    if (userTokenFromStorage) {
      if (!areaAddress) {
        const address = await getUserAddress();
        data = await getRoutesInYourArea(
          address as string,
          currentPageAreaRoutes
        );
      } else {
        currentPageAreaRoutes = 1;
        data = await getRoutesInYourArea(
          areaAddress as string,
          currentPageAreaRoutes
        );
      }
      if (data && data.routes) {
        if (currentPageAreaRoutes === 1) {
          setRoutes(data.routes);
        } else if (appendRoutes) {
          appendRoutes(data.routes);
        }
      }

      if (setLastPage) setLastPage(data.lastPage);
      currentPageAreaRoutes++;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchRoutesByChoosingArea = async (
  setRoutes: (routes: Route[]) => void,
  appendRoutes: (routes: Route[]) => void, // פונקציה שתוסיף מסלולים קיימים
  routesInChosenArea: Route[]
): Promise<void> => {
  try {
    const paginatedRoutes = routesInChosenArea.slice(
      (currentPageAreaRoutes - 1) * 10,
      currentPageAreaRoutes * 10
    );

    if (currentPageAreaRoutes === 1) {
      setRoutes(paginatedRoutes);
    } else {
      appendRoutes(paginatedRoutes);
    }

    currentPageAreaRoutes++;
  } catch (error) {
    console.error(error);
  }
};
