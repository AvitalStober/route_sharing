// import { create } from "zustand";
// import { StoreState } from "../types/storeState";
// import { getUserAddress } from "../functions/usersFunctions";
// import { getRoutesInYourArea } from "../services/routeService";

// export const fetchRoutesInYourArea = async () => {
//   try {
//     const address = await getUserAddress();
//     const routes = await getRoutesInYourArea(address as string);
//     return routes;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// const useStore = create<StoreState>((set) => ({
//   token: null, // ערך התחלתי
//   setToken: (token) => {
//     set({ token });
//   },
//   clearToken: () => set({ token: null }), // איפוס הערך
//   // Routes: [],
//   Routes: fetchRoutesInYourArea(),
//   setRoutes: (routes) => set((state) => ({ ...state, Routes: routes })),
// }));
// export default useStore;



import { create } from "zustand";
import { StoreState } from "../types/storeState";
import { getUserAddress } from "../functions/usersFunctions";
import { getRoutesInYourArea } from "../services/routeService";

const fetchRoutesInYourArea = async () => {
  try {
    const address = await getUserAddress();
    console.log("address", address);

    const routes = await getRoutesInYourArea(address as string);
    console.log("routes", routes);
    
    return routes; 
  } catch (error) {
    console.log(error);
    return []; 
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
    const routes = await fetchRoutesInYourArea();
    set({ Routes: routes }); 
  },
}));

useStore.getState().initializeRoutes();

export default useStore;
