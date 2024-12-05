"use client";
import React, { useEffect, useState } from "react";
import {
  fetchHistoryRoutes,
  FetchOwnerRoutes,
  fetchRoutesInYourArea,
} from "@/app/functions/filteredRoutesFunctions";
import Route from "@/app/types/routes";
import Cards from "@/app/components/Cards";

const FilteredRoutes = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>("routes");
  const [Routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    fetchRoutesInYourArea(setSelectedRoute, setRoutes);
  }, []);

  return (
    <div>
      <div className="flex mb-6 relative text-right">
        <div
          onClick={() => fetchRoutesInYourArea(setSelectedRoute, setRoutes)}
          className={`cursor-pointer py-2 px-4 inline-block relative text-center ${
            selectedRoute === "routes" ? "border-b-4 border-black z-10" : ""
          }`}
          style={{ inlineSize: "200px" }}
        >
          מסלולים באזורך
        </div>
        <div
          onClick={() => fetchHistoryRoutes(setSelectedRoute, setRoutes)}
          className={`cursor-pointer py-2 px-4 inline-block relative text-center ${
            selectedRoute === "history" ? "border-b-4 border-black z-10" : ""
          }`}
          style={{ inlineSize: "200px" }}
        >
          הסטוריית מסלולים
        </div>
        <div
          onClick={() => FetchOwnerRoutes(setSelectedRoute, setRoutes)}
          className={`cursor-pointer py-2 px-4 inline-block relative text-center ${
            selectedRoute === "myRoutes" ? "border-b-4 border-black z-10" : ""
          }`}
          style={{ inlineSize: "200px" }}
        >
          מסלולים שלי
        </div>

        <div
          className="absolute bottom-0 left-0 h-1 bg-gray-300 z-0"
          style={{ inlineSize: "600px", insetInlineStart: "0" }}
        ></div>
      </div>
      <div>
        {selectedRoute === "routes" && <Cards Routes={Routes} filtered={1} />}
        {selectedRoute === "myRoutes" && <Cards Routes={Routes} filtered={2} />}
        {selectedRoute === "history" && <Cards Routes={Routes} filtered={3} />}
      </div>
    </div>
  );
};

export default FilteredRoutes;
