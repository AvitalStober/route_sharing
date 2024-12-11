// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   fetchHistoryRoutes,
//   FetchOwnerRoutes,
//   fetchRoutesInYourArea,
// } from "@/app/functions/filteredRoutesFunctions";
// import RouteCard from "@/app/components/RouteCard";
// import useStore from "@/app/store/store";
// import AddressSearch from "./AddressSearch";

// const FilteredRoutes = () => {
//   const [selectedRoute, setSelectedRoute] = useState<string | null>("routes");
//   const Routes = useStore((state) => state.Routes);
//   const setRoutes = useStore((state) => state.setRoutes);

//   useEffect(() => {
//     fetchRoutesInYourArea(setRoutes, setSelectedRoute);
//   }, []);

//   return (
//     <div className="flex-shrink-0">
//       <div className=" mt-auto">
//         <div className="flex mb-6 relative text-right">
//           <div
//             onClick={() => fetchRoutesInYourArea(setRoutes, setSelectedRoute)}
//             className={`cursor-pointer py-2 px-4 inline-block relative text-center ${
//               selectedRoute === "routes" ? "border-b-4 border-black z-10" : ""
//             }`}
//             style={{ inlineSize: "200px" }}
//           >
//             מסלולים באזורך
//           </div>
//           <div
//             onClick={() => fetchHistoryRoutes(setSelectedRoute, setRoutes)}
//             className={`cursor-pointer py-2 px-4 inline-block relative text-center ${
//               selectedRoute === "history" ? "border-b-4 border-black z-10" : ""
//             }`}
//             style={{ inlineSize: "200px" }}
//           >
//             הסטוריית מסלולים
//           </div>
//           <div
//             onClick={() => FetchOwnerRoutes(setSelectedRoute, setRoutes)}
//             className={`cursor-pointer py-2 px-4 inline-block relative text-center ${
//               selectedRoute === "myRoutes" ? "border-b-4 border-black z-10" : ""
//             }`}
//             style={{ inlineSize: "200px" }}
//           >
//             מסלולים שלי
//           </div>

//           <div
//             className="absolute bottom-0 left-0 h-1 bg-gray-300 z-0"
//             style={{ inlineSize: "600px", insetInlineStart: "0" }}
//           ></div>
//         </div>
//       </div>
//       <div className="flex-shrink-0">
//         <AddressSearch />
//       </div>
//       <div>
//         {selectedRoute === "routes" && (
//           <RouteCard Routes={Routes} filtered={1} />
//         )}
//         {selectedRoute === "history" && (
//           <RouteCard Routes={Routes} filtered={2} />
//         )}
//         {selectedRoute === "myRoutes" && (
//           <RouteCard Routes={Routes} filtered={3} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default FilteredRoutes;

"use client";
import React, { useState } from "react";
import {
  fetchHistoryRoutes,
  FetchOwnerRoutes,
  fetchRoutesInYourArea,
} from "@/app/functions/filteredRoutesFunctions";
import RouteCard from "@/app/components/RouteCard";
import useStore from "@/app/store/store";
// import AddressSearch from "./AddressSearch";

const FilteredRoutes = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>("routes");
  const Routes = useStore((state) => state.Routes);
  const setRoutes = useStore((state) => state.setRoutes);
  const initializeRoutes = useStore((state) => state.initializeRoutes);
  if (Routes && Routes.length == 0 && selectedRoute === "routes")
    initializeRoutes();

  // useEffect(() => {
  //   if (selectedRoute !== "routes") {
  //     setRoutes([]);
  //   }
  // }, []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-around mb-4 relative">
        {/* טאבים - צמודים לשמאל */}
        <div className="flex space-x-4">
          <div
            onClick={() => fetchRoutesInYourArea(setRoutes, setSelectedRoute)}
            className={`cursor-pointer py-2 px-4 inline-block text-center ${
              selectedRoute === "routes" ? "border-b-4 border-black z-10" : ""
            }`}
          >
            מסלולים באזורך
          </div>
          <div
            onClick={() => fetchHistoryRoutes(setSelectedRoute, setRoutes)}
            className={`cursor-pointer py-2 px-4 inline-block text-center ${
              selectedRoute === "history" ? "border-b-4 border-black z-10" : ""
            }`}
          >
            הסטוריית מסלולים
          </div>
          <div
            onClick={() => FetchOwnerRoutes(setSelectedRoute, setRoutes)}
            className={`cursor-pointer py-2 px-4 inline-block text-center ${
              selectedRoute === "myRoutes" ? "border-b-4 border-black z-10" : ""
            }`}
          >
            מסלולים שלי
          </div>
        </div>

        {/* <div className="flex">
          <AddressSearch />
        </div> */}
      </div>

      {/* תוכן המסלולים */}
      <div>
        {selectedRoute === "routes" && (
          <RouteCard Routes={Routes} filtered={1} />
        )}
        {selectedRoute === "history" && (
          <RouteCard Routes={Routes} filtered={2} />
        )}
        {selectedRoute === "myRoutes" && (
          <RouteCard Routes={Routes} filtered={3} />
        )}
      </div>
    </div>
  );
};

export default FilteredRoutes;
