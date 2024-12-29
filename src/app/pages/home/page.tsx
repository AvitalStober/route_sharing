"use client";
import Footer from "@/app/components/Footer";
import React, { useEffect, useState } from "react";
import FilteredRoutes from "@/app/components/FilteredRoutes";
import AreaRoute from "@/app/components/AreaRoute";
import SideBar from "@/app/components/SideBar";
import AddRoute from "@/app/components/AddRoute";
import HomePage from "../homePage/page";
import useStore from "@/app/store/store";

const Page = () => {
  const [isAreaChoosing, setIsAreaChoosing] = useState(false);
  const [isAddRoute, setIsAddRoute] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<string | null>("routes");
  const filterAddress = useStore((state) => state.filterAddress);

  useEffect(() => {
    if (filterAddress === true) {
      setIsAddRoute(false);
      setIsAreaChoosing(false);
      setIsHomePage(false);
    }
  }, [filterAddress]);

  return (
    <div className="min-h-screen grid grid-rows-[1fr_auto] grid-cols-[1fr_250px]">
      <div className="flex flex-col col-span-1">
        <div className="" style={{ inlineSize: `100%` }}>
          {!isAreaChoosing && !isAddRoute && !isHomePage ? (
            <div>
              <div
                dir="rtl"
                className="flex flex-col md:flex-row justify-around gap-4"
              >
                <div dir="ltr" className="w-full md:w-auto mb-3">
                  <FilteredRoutes
                    selectedRoute={selectedRoute}
                    setSelectedRoute={setSelectedRoute}
                    setIsAreaChoosing={setIsAreaChoosing}
                    setIsAddRoute={setIsAddRoute}
                    setIsHomePage={setIsHomePage}
                  />
                </div>
              </div>
            </div>
          ) : isAreaChoosing ? (
            <AreaRoute setIsAreaChoosing={setIsAreaChoosing} />
          ) : isAddRoute ? (
            <AddRoute setIsAddRoute={setIsAddRoute} />
          ) : (
            isHomePage && (
              <div dir="ltr" className="w-full md:w-auto mb-3">
                <HomePage />
              </div>
            )
          )}
        </div>
      </div>
      <SideBar
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
        setIsAreaChoosing={setIsAreaChoosing}
        setIsAddRoute={setIsAddRoute}
        setIsHomePage={setIsHomePage}
      />
      <div className="col-span-1">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
