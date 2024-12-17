// import { create } from "zustand";
// import { StoreState } from "../types/storeState";
// import { getUserAddress } from "../functions/usersFunctions";
// import { getRoutesInYourArea } from "../services/routeService";

// const fetchRoutesInYourArea = async () => {
//   try {
//     const address = await getUserAddress();

//     const routes = await getRoutesInYourArea(address as string);

//     return routes;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// // יצירת ה-store
// const useStore = create<StoreState>((set) => ({
//   token: null,
//   setToken: (token) => set({ token }),
//   clearToken: () => set({ token: null }),
//   Routes: [],
//   setRoutes: (routes) => set({ Routes: routes }),

//   initializeRoutes: async () => {

//     const routes = await fetchRoutesInYourArea();
//     set({ Routes: routes });
//   },
// }));

// useStore.getState().initializeRoutes();

// export default useStore;

import { create } from "zustand";
import { StoreState } from "../types/storeState";
import { getUserAddress } from "../functions/usersFunctions";
import { getRoutesInYourArea } from "../services/routeService";
import IRoute from "../types/routes";
import Routes from "../lib/models/routeModel";
import {fetchRoutesInYourArea} from "@/app/functions/filteredRoutesFunctions"

// const fetchRoutesInYourArea = async () => {
//   try {
//     const address = await getUserAddress();

//     if (!address) {
//       console.log("No address found for the user");
//       return;
//     }
//     const routes = await getRoutesInYourArea(address as string, 1);
//     console.log(routes.routes);
//     return routes.routes;
//   } catch (error) {
//     console.error(error);
//     return []; // או יותר טוב, להחזיר null או לערוך טעות אחרת המתאימה למקרה זה.
//   }
// };

// יצירת ה-store


const useStore = create<StoreState>((set, get) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
  Routes: [],
  setRoutes: (routes) => set({ Routes: routes }),

  initializeRoutes: async () => {
    // בדיקה אם יש משתמש מחובר
    // const { token } = useStore.getState();
    // if (!token) {
    //   console.warn("User is not logged in. Cannot initialize routes.");
    //   return;
    // }
    const setRoutes = useStore.getState().setRoutes;
    await fetchRoutesInYourArea(setRoutes);
    // debugger;
    // if (data) set({ Routes: data.routes });
    // else if (data) set({ Routes: data });
    console.log("Updated Routes:", get().Routes);
  },
}));

// הפעלה מידית של initializeRoutes רק אם המשתמש מחובר
useStore.getState().initializeRoutes();

export default useStore;
