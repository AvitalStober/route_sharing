import { create } from "zustand";
import { StoreState } from "../types/storeState";

const useStore = create<StoreState>((set) => ({
  token: null, // ערך התחלתי
  setToken: (token) => {
    set({ token });
  },
  clearToken: () => set({ token: null }), // איפוס הערך
}));
export default useStore;
