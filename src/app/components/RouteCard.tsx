"use client";
import React, { useEffect, useState } from "react";
import CardMap from "./CardMap";
import RouteCardProps from "../types/props/‎RouteCardProps";
import {
  getUserRouteRate,
} from "@/app/functions/cardsFunctions";
import Image from "next/image";
import IRoute from "../types/routes";

const RouteCard: React.FC<RouteCardProps> = ({ Routes, filtered }) => {

  const [routeRates, setRouteRates] = useState<{ [routeId: string]: number }>(
    {}
  );

  const fetchRates = async () => {
    const rates: Record<string, number> = {};
    const localRoutes: IRoute[] = [];
    if (Routes) {
      for (const route of Routes) {
        if (filtered === 2) {
          rates[route._id as string] =
            (await getUserRouteRate(route._id as string)) || 0;
          localRoutes.push(route);
        }
      }
      setRouteRates(rates);
    }
  };

  useEffect(() => {
    if (filtered === 2) {
      fetchRates();
    }
  }, [filtered]);


  return (
    <div className="m-4 w-full">
      {Array.isArray(Routes) && Routes.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
          {Routes.map((route, index) => (
            <div
              key={index}
              className="w-full flex-[0_0_300px] min-w-[300px] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col"
            >
              <CardMap
                points={route.pointsArray}
                route={route}
                filtered={filtered}
                routeRates={routeRates}
              />
            </div>
          ))}
        </div>
      ) : (
        // אין מסלולים זמינים
        <div className="flex flex-col mt-8 text-center justify-center items-center p-4 font-mono font-semibold border rounded">
          <p className="text-xl">
            לא נמצאו מסלולים התואמים לחיפוש שלך. <br />
            זו ההזדמנות שלך להוסיף מסלול חדש ולשתף אותו עם כולם!
          </p>

          <Image
            src={
              "https://res.cloudinary.com/dltlyphap/image/upload/v1735199623/33075775_isometric_businessman_with_magnifying_glass_analyze_circle_footstep-1024x1024-removebg-preview_ml81fh.png"
            }
            alt={"no routes available"}
            width={350}
            height={350}
          />
        </div>
      )}
    </div>
  );
};

export default RouteCard;
