import React, { useEffect, useState } from "react";
import CardMap from "./CardMap";
import RouteCardProps from "../types/‎RouteCardProps";
import {
  addRouteToHistoryRoute,
  handleStarClick,
} from "@/app/functions/cardsFunctions";
import Star from "@/app/components/Star";
import { useRouter } from "next/navigation";

const RouteCard: React.FC<RouteCardProps> = ({ Routes, filtered }) => {
  const [selectedRatings, setSelectedRatings] = useState<{
    [routeId: string]: number;
  }>({});
  const [error, setError] = useState("");

  const router = useRouter();
  // טיפול בשגיאה אם המערך ריק

  useEffect(() => {
    if (!Routes || Routes.length === 0) {
      setError("No routes available");
    } else {
      setError(""); // איפוס שגיאה אם המערך אינו ריק
    }
  }, [Routes]);

  const handleStarClickInternal = async (routeId: string, new_rate: number) => {
    await handleStarClick(routeId, new_rate, selectedRatings, filtered, setSelectedRatings);
  };

  return (
    <div className="m-4">
       {error && (
        <div className="text-center p-4 mb-4 text-yellow-500 font-semibold bg-yellow-100 border border-yellow-400 rounded">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Routes.map((route, index) => (
          <div
            key={index}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <CardMap points={route.pointsArray} />
            <Star
              key={index}
              rate={
                filtered === 2
                  ? selectedRatings[route._id as string] || 0
                  : route.rate!
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
        ))}
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


