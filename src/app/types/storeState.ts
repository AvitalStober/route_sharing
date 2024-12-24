import IRoute from "./routes";

export interface Token {
  id: string;
  email: string;
  name: string;
}

export interface StoreState {
  initializeRoutes(): unknown;
  token: Token | null;
  setToken: (token: Token) => void;
  clearToken: () => void;
  Routes: IRoute[];
  setRoutes: (routes: IRoute[]) => void;
  currentPage: number;
  setCurrentPage: (
    currentPage: number | ((prevPage: number) => number)
  ) => void;
  lastPage: boolean;
  setLastPage: (lastPage: boolean) => void;
  changeAddress: string;
  setChangeAddress: (changeAddress: string) => void;
  // areaPoints: google.maps.LatLngLiteral[]; // מערך של נקודות על המפה
  // setAreaPoints: (
  //   updater: (prevPoints: google.maps.LatLngLiteral[]) => google.maps.LatLngLiteral[]
  // ) => void; // עדכון הנקודות
  // resetAreaPoints: () => void; // איפוס הנקודות
}
