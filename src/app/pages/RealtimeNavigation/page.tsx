"use client";

import RealtimeNavigation from "@/app/components/RealtimeNavigation";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchRouteById } from "@/app/functions/routesFunctions";
import IRoute from "@/app/types/routes";

const Page = () => {
  const searchParams = useSearchParams();
  const routeId = searchParams.get("routeId");

  const [route, setRoute] = useState<IRoute | undefined>(undefined);

  useEffect(() => {
    const getRoute = async () => {
      if (routeId) {
        const fetchedRoute = await fetchRouteById(routeId);
        setRoute(fetchedRoute);
      }
    };

    getRoute();
  }, [routeId]);

  if (!route) {
    return <div>Loading...</div>;
  }

  return <RealtimeNavigation waypoints={route.pointsArray} />;
};

export default Page;
