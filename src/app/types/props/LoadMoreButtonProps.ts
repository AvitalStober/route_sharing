import IRoute from "../routes";

export interface LoadMoreButtonProps {
  fetchFunction: (
    setRoutes: (routes: IRoute[]) => void,
    newPage: number,
    setLastPage: (lastPage: boolean) => void,
    changeAddress?: string
  ) => void;
  setRoutes: (routes: IRoute[]) => void;
  setLastPage: (lastPage: boolean) => void;
  setCurrentPage: (updateFn: (prevPage: number) => number) => void;
  changeAddress?: string | undefined;
}