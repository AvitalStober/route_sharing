import IRoute from "./routes";

export type FetchFunction = (
    setRoutes: (routes: IRoute[]) => void,
    currentPage: number,
    setLastPage?: (lastPage: boolean) => void,
    areaAddress?: string
  ) => Promise<void>;