import { create } from "zustand";
import { StoreState } from "../types/storeState";
import {fetchRoutesInYourArea} from "@/app/functions/filteredRoutesFunctions"

const useStore = create<StoreState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
  Routes: [],
  setRoutes: (routes) => set({ Routes: routes }),

  initializeRoutes: async () => {
    const setRoutes = useStore.getState().setRoutes;
    await fetchRoutesInYourArea(setRoutes);
  },
}));

// הפעלה מידית של initializeRoutes רק אם המשתמש מחובר
useStore.getState().initializeRoutes();

export default useStore;
