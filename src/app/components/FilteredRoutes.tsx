// "use client";
// import React, { useState } from "react";
// import {
//   fetchHistoryRoutes,
//   FetchOwnerRoutes,
//   fetchRoutesInYourArea,
// } from "@/app/functions/filteredRoutesFunctions";
// import RouteCard from "@/app/components/RouteCard";
// import useStore from "@/app/store/store";
// import { FilteredRoutesProps } from "../types/props/FilteredRoutesProps";
// import IRoute from "../types/routes";

// const FilteredRoutes: React.FC<FilteredRoutesProps> = ({
//   selectedRoute,
//   setSelectedRoute,
// }) => {
//   const initializeRoutes = useStore((state) => state.initializeRoutes);

//   // סטייט חדש עבור רשימת המסלולים
//   const [Routes, setRoutes] = useState<IRoute[]>([]);

//   // פונקציה לעדכון הסטייט על ידי הוספת מסלולים חדשים
//   const appendRoutes = (newRoutes: IRoute[]) => {
//     setRoutes((prevRoutes) => [...prevRoutes, ...newRoutes]);
//   };

//   if (Routes && Routes.length == 0 && selectedRoute === "routes")
//     initializeRoutes();

//   return (
//     <div className="flex flex-col">
//       <div className="flex items-center justify-around mb-4 relative">
//         <div className="flex space-x-4">
//           <div
//             onClick={() => fetchRoutesInYourArea(setRoutes, setSelectedRoute, appendRoutes)}
//             className={`cursor-pointer py-2 px-4 inline-block text-center ${
//               selectedRoute === "routes" ? "border-b-4 border-black z-10" : ""
//             }`}
//           >
//             מסלולים באזורך
//           </div>
//           <div
//             onClick={() => fetchHistoryRoutes(setSelectedRoute, setRoutes, appendRoutes)}
//             className={`cursor-pointer py-2 px-4 inline-block text-center ${
//               selectedRoute === "history" ? "border-b-4 border-black z-10" : ""
//             }`}
//           >
//             הסטוריית מסלולים
//           </div>
//           <div
//             onClick={() =>
//               FetchOwnerRoutes(setSelectedRoute, setRoutes, appendRoutes)
//             }
//             className={`cursor-pointer py-2 px-4 inline-block text-center ${
//               selectedRoute === "myRoutes" ? "border-b-4 border-black z-10" : ""
//             }`}
//           >
//             מסלולים שלי
//           </div>
//         </div>
//       </div>

//       <div>
//         {selectedRoute === "routes" && (
//           <>
//           <RouteCard Routes={Routes} filtered={1} />
//           <button
//               onClick={() => {
//                 fetchRoutesInYourArea(setSelectedRoute, setRoutes, appendRoutes);
//               }}
//               className="mt-4 p-2 bg-blue-500 text-white rounded"
//             >
//               טען עוד מסלולים
//             </button>
//           </>
//         )}
//         {selectedRoute === "history" && (
//           <>
//           <RouteCard Routes={Routes} filtered={2} />
//           <button
//               onClick={() => {
//                 fetchHistoryRoutes(setSelectedRoute, setRoutes, appendRoutes);
//               }}
//               className="mt-4 p-2 bg-blue-500 text-white rounded"
//             >
//               טען עוד מסלולים
//             </button>
//           </>
//         )}
//         {selectedRoute === "myRoutes" && (
//           <>
//             <RouteCard Routes={Routes} filtered={3} />
//             <button
//               onClick={() => {
//                 FetchOwnerRoutes(setSelectedRoute, setRoutes, appendRoutes);
//               }}
//               className="mt-4 p-2 bg-blue-500 text-white rounded"
//             >
//               טען עוד מסלולים
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FilteredRoutes;

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
import IRoute from "../types/routes";

const FilteredRoutes: React.FC<FilteredRoutesProps> = ({
  selectedRoute,
  setSelectedRoute,
}) => {
  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const changeAddress = useStore((state) => state.changeAddress);

  const Routes = useStore((state) => state.Routes);
  const initializeRoutes = useStore((state) => state.initializeRoutes);
  const setRoutes = useStore((state) => state.setRoutes);
  // סטייט חדש עבור רשימת המסלולים
  // const [lastPage, setLastPage] = useState(false);
  const lastPage = useStore((state) => state.lastPage);
  const setLastPage = useStore((state) => state.setLastPage);

  // פונקציה לעדכון הסטייט על ידי הוספת מסלולים חדשים
  const appendRoutes = (newRoutes: IRoute[]) => {
    if (newRoutes.length !== 0) {
      const newArray: IRoute[] = [...Routes, ...newRoutes];
      setRoutes(newArray);
    }
  };
  // אם אין מסלולים, נטען את המסלולים הראשונים

  if (
    Routes &&
    Routes.length === 0 &&
    selectedRoute === "routes" &&
    changeAddress == ""
  ) {
    initializeRoutes();
  }

  useEffect(() => {
  }, [currentPage]);

  return (
    <div className="flex flex-col">
      {/* <div className="flex m-2 relative">
        <div className="flex space-x-4">
          <div
            onClick={() => {
              const newPage = 1;
              setCurrentPage(newPage);
              setLastPage(false);
              fetchRoutesInYourArea(
                setRoutes,
                newPage,
                setLastPage,
                appendRoutes,
                setSelectedRoute
              );
            }}
            className={`cursor-pointer py-2 px-4 inline-block text-center ${
              selectedRoute === "routes"
                ? "border-b-4 border-slate-600 z-10"
                : ""
            }`}
          >
            מסלולים באזורך
          </div>
          <div
            onClick={() => {
              const newPage = 1;
              setCurrentPage(newPage);
              setLastPage(false);
              fetchHistoryRoutes(
                setSelectedRoute,
                setRoutes,
                appendRoutes,
                newPage,
                setLastPage
              );
            }}
            className={`cursor-pointer py-2 px-4 inline-block text-center ${
              selectedRoute === "history"
                ? "border-b-4 border-slate-600 z-10"
                : ""
            }`}
          >
            הסטוריית מסלולים
          </div>
          <div
            onClick={() => {
              const newPage = 1;
              setCurrentPage(newPage);
              setLastPage(false);
              FetchOwnerRoutes(
                setSelectedRoute,
                setRoutes,
                appendRoutes,
                newPage,
                setLastPage
              );
            }}
            className={`cursor-pointer py-2 px-4 inline-block text-center ${
              selectedRoute === "myRoutes"
                ? "border-b-4 border-slate-600 z-10"
                : ""
            }`}
          >
            מסלולים שלי
          </div>
        </div>
      </div> */}

      <div>
        {/* אם נבחר מסלול "routes" */}
        {selectedRoute === "routes" && (
          <>
            <RouteCard Routes={Routes} filtered={1} />
            {!lastPage && (
              <button
                onClick={() => {
                  setCurrentPage((prevPage) => {
                    const newPage = prevPage + 1;
                    fetchRoutesInYourArea(
                      setRoutes,
                      newPage,
                      setLastPage,
                      appendRoutes,
                      undefined,
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
        {/* אם נבחרה היסטוריית מסלולים */}
        {selectedRoute === "history" && (
          <>
            <RouteCard Routes={Routes} filtered={2} />
            {!lastPage && (
              <button
                onClick={() => {
                  setCurrentPage((prevPage) => {
                    const newPage = prevPage + 1;
                    fetchHistoryRoutes(
                      setSelectedRoute,
                      setRoutes,
                      appendRoutes,
                      newPage,
                      setLastPage
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
        {/* אם נבחרו מסלולים שלי */}
        {selectedRoute === "myRoutes" && (
          <>
            <RouteCard Routes={Routes} filtered={3} />
            {!lastPage && (
              <button
                onClick={() => {
                  setCurrentPage((prevPage) => {
                    const newPage = prevPage + 1;
                    FetchOwnerRoutes(
                      setSelectedRoute,
                      setRoutes,
                      appendRoutes,
                      newPage,
                      setLastPage
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
