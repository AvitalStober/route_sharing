"use client";
import React, { useEffect } from "react";
import {
  fetchHistoryRoutes,
  FetchOwnerRoutes,
  fetchRoutesInYourArea,
} from "@/app/functions/filteredRoutesFunctions";
import RouteCard from "@/app/components/RouteCard";
import useStore from "@/app/store/store";
import { FilteredRoutesProps } from "../types/props/FilteredRoutesProps";
import LoadRoutes from "./LoadRoutes";
import LoadMoreButton from "./LoadMoreButton";
import { displayPoints } from "../functions/areaChoosingFunctions";
import IRoute from "../types/routes";

const FilteredRoutes: React.FC<FilteredRoutesProps> = ({
  selectedRoute,
  setSelectedRoute,
}) => {
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const setChangeAddress = useStore((state) => state.setChangeAddress);
  const changeAddress = useStore((state) => state.changeAddress);
  const Routes = useStore((state) => state.Routes);
  const initializeRoutes = useStore((state) => state.initializeRoutes);
  const setRoutes = useStore((state) => state.setRoutes);
  const lastPage = useStore((state) => state.lastPage);
  const setLastPage = useStore((state) => state.setLastPage);
  type FetchFunction = (
    setRoutes: (routes: IRoute[]) => void,
    currentPage: number,
    setLastPage?: (lastPage: boolean) => void,
    areaAddress?: string
  ) => Promise<void>;

  const handleLoadRoutes = (fetchFunction: FetchFunction, label: string) => {
    return () => {
      const newPage = 1;
      setCurrentPage(newPage);
      setLastPage(false);
      setSelectedRoute(label);
      fetchFunction(setRoutes, newPage, setLastPage);
    };
  };

  // אם אין מסלולים, נטען את המסלולים הראשונים
  useEffect(() => {
    if (
      Routes &&
      Routes.length === 0 &&
      selectedRoute === "routes" &&
      changeAddress.length === 0
    ) {
      initializeRoutes();
    }
  }, []);

  useEffect(() => {
    if (changeAddress) {
      console.log("הכתובת עודכנה:", changeAddress);
      setSelectedRoute("chosenArea");
    }
  }, [changeAddress]);

  return (
    <div className="flex flex-col">
      <div className="flex m-2 relative">
        <div className="flex space-x-4">
          {/* כפתור למסלולים באזורך */}
          <LoadRoutes
            label="מסלולים באזורך"
            selectedRoute="routes"
            onClick={handleLoadRoutes(fetchRoutesInYourArea, "routes")}
          />

          {/* כפתור להיסטוריית מסלולים */}
          <LoadRoutes
            label="היסטוריית מסלולים"
            selectedRoute="history"
            onClick={handleLoadRoutes(fetchHistoryRoutes, "history")}
          />
          {/* כפתור למסלולים שלי */}
          <LoadRoutes
            label="המסלולים שלי"
            selectedRoute="myRoutes"
            onClick={handleLoadRoutes(FetchOwnerRoutes, "myRoutes")}
          />
        </div>
      </div>

      <div>
        {/* אם נבחר מסלול "routes" */}
        {selectedRoute === "routes" && (
          <>
            <RouteCard Routes={Routes} filtered={1} />
            <p>changeAddress{changeAddress}</p>
            {!lastPage && (
              <LoadMoreButton
                fetchFunction={fetchRoutesInYourArea}
                setRoutes={setRoutes}
                setLastPage={setLastPage}
                setCurrentPage={setCurrentPage}
                changeAddress={changeAddress} // העברת changeAddress
              />
            )}
          </>
        )}
        {/* אם נבחרה היסטוריית מסלולים */}
        {selectedRoute === "history" && (
          <>
            <RouteCard Routes={Routes} filtered={2} />
            {!lastPage && (
              <LoadMoreButton
                fetchFunction={fetchHistoryRoutes}
                setRoutes={setRoutes}
                setLastPage={setLastPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </>
        )}
        {/* אם נבחרו מסלולים שלי */}
        {selectedRoute === "myRoutes" && (
          <>
            <RouteCard Routes={Routes} filtered={4} />
            {!lastPage && (
              <LoadMoreButton
                fetchFunction={FetchOwnerRoutes}
                setRoutes={setRoutes}
                setLastPage={setLastPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </>
        )}
        {selectedRoute === "chosenArea" && (
          <>
            <RouteCard Routes={Routes} filtered={1} />
            {!lastPage && (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setCurrentPage((prevPage) => {
                    const newPage = prevPage + 1;
                    displayPoints(
                      setRoutes,
                      newPage,
                      setLastPage,
                      undefined,
                      undefined,
                      setChangeAddress,
                      changeAddress
                    );
                    return newPage;
                  });
                }}
                className="mt-4 p-2 bg-blue-500 text-white rounded"
              >
                טען עוד מסלולים
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FilteredRoutes;
