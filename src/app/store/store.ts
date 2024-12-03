import { create } from "zustand";
import { StoreState } from "../types/storeState";
// import {Token} from "@/app/types/storeState"

const useStore = create<StoreState>((set) => ({
  token: null, // ערך התחלתי
  setToken: (token) => {
    // console.log("setToken called with:", token); // בדיקה אם הנתונים מתקבלים
    set({ token });
  },
  clearToken: () => set({ token: null }), // איפוס הערך
}));
export default useStore;
