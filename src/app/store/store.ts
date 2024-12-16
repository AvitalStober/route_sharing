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

const fetchRoutesInYourArea = async () => {
  try {
    const address = await getUserAddress();

    if (!address) {
      throw new Error("No address found for the user.");
    }

    const routes = await getRoutesInYourArea(address);
    return routes;
  } catch (error) {
    console.error(error);
    return []; // או יותר טוב, להחזיר null או לערוך טעות אחרת המתאימה למקרה זה.
  }
};

// יצירת ה-store
const useStore = create<StoreState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
  Routes: [], 
  setRoutes: (routes) => set({ Routes: routes }),
  
  initializeRoutes: async () => {
    // בדיקה אם יש משתמש מחובר
    const { token } = useStore.getState();
    if (!token) {
      console.warn("User is not logged in. Cannot initialize routes.");
      return;
    }

    const routes = await fetchRoutesInYourArea();
    set({ Routes: routes });
  },
}));

// הפעלה מידית של initializeRoutes רק אם המשתמש מחובר
useStore.getState().initializeRoutes();

export default useStore;

