import { create } from "zustand";
import { StoreState } from "../types/storeState";
import { fetchRoutesInYourArea } from "@/app/functions/filteredRoutesFunctions";

const useStore = create<StoreState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
  Routes: [],
  setRoutes: (routes) => set({ Routes: routes }),
  currentPage: 1,
  setCurrentPage: (page) => {
    set((state) => ({
      currentPage:
        typeof page === "function"
          ? (page as (prev: number) => number)(state.currentPage)
          : page,
    }));
  },
  lastPage:false,
  setLastPage: (lastPage) => set({ lastPage }),
  changeAddress:"",
  setChangeAddress: (changeAddress) => set({ changeAddress }),

  initializeRoutes: async () => {
    const setRoutes = useStore.getState().setRoutes;
    await fetchRoutesInYourArea(setRoutes, 1);
  },
}));

// הפעלה מידית של initializeRoutes רק אם המשתמש מחובר
useStore.getState().initializeRoutes();

export default useStore;
