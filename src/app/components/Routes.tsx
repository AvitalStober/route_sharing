"use client";
import React, { useEffect, useState } from "react";
import { getRoutesByOwner } from "@/app/services/routeService";
import Route from "@/app/types/routes";
import Cards from "./Cards";
import useStore from "@/app/store/store";

const Routes = () => {
  const [ownerRoutes, setOwnerRoutes] = useState<Route[]>([]); // עדכון לסוג מערך של Routes
  const token = useStore((state) => state.token?.id);
  console.log("routes by owner",token);
  const userId = token || '';

  useEffect(() => {
    const FetchUserRoutes = async () => {
      try {
        const ownerR = await getRoutesByOwner(userId);
        setOwnerRoutes(ownerR);
      } catch (error) {
        console.error("Error fetching user routes:", error);
      }
    };
    FetchUserRoutes();
  }, []);

  return (
    <div>
      <Cards ownerRoutes={ownerRoutes} />
    </div>
  );
};

export default Routes;
