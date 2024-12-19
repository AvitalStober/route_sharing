"use client";
import React, { useEffect, useState } from "react";
import CardMap from "./CardMap";
import RouteCardProps from "../types/props/‎RouteCardProps";
import {
  addRouteToHistoryRoute,
  handleStarClick,
  getUserRouteRate,
} from "@/app/functions/cardsFunctions";
import Star from "@/app/components/Star";
import { useRouter } from "next/navigation";

const RouteCard: React.FC<RouteCardProps> = ({ Routes, filtered }) => {
  const [selectedRatings, setSelectedRatings] = useState<{
    [routeId: string]: number;
  }>({});

  const [routeRates, setRouteRates] = useState<{ [routeId: string]: number }>(
    {}
  );

  const fetchRates = async () => {
    const rates: Record<string, number> = {};
    if (Routes) {
      for (const route of Routes) {
        if (filtered === 2) {
          rates[route._id as string] =
            (await getUserRouteRate(route._id as string)) || 0;
        }
      }
      setRouteRates(rates);
    }
  };

  useEffect(() => {
    if (filtered === 2) {
      fetchRates();
    }
  }, [filtered, Routes]);

  const router = useRouter();

  const handleStarClickInternal = async (routeId: string, new_rate: number) => {
    await handleStarClick(
      routeId,
      new_rate,
      selectedRatings,
      filtered,
      setSelectedRatings
    );
  };

  return (
    <div className="m-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(Routes) && Routes.length > 0 ? (
          Routes.map((route, index) => (
            <div
              key={index}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <CardMap points={route.pointsArray} route={route} filtered={filtered}/>
              {/* <RealtimeNavigation route={route.pointsArray} /> */}
              <Star
                rate={
                  filtered === 2
                    ? routeRates[route._id as string] || 0
                    : route.rate || 0
                }
                filtered={filtered}
                onClick={(newRate) =>
                  handleStarClickInternal(route._id as string, newRate)
                }
              />

              {filtered === 1 && (
                <div className="mt-2">
                  <button
                    onClick={() => addRouteToHistoryRoute(route._id as string)}
                    className={`px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 bg-green-500 text-white hover:bg-green-600`}
                  >
                    Select Route
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="w-full text-center p-4 mb-4 text-red-500 font-semibold bg-red-100 border border-red-400 rounded">
            No routes available.
          </div>
        )}

        {filtered === 3 && (
          <button
            onClick={() => {
              router.push("/pages/addRoute");
            }}
            className={`m-4 px-6 py-3 text-6xl text-center font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-80 bg-blue-500 bg-opacity-75 text-white hover:bg-blue-600 hover:bg-opacity-80`}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default RouteCard;
