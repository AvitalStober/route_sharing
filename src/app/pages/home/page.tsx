"use client";
import Footer from "@/app/components/Footer";
import React, { useEffect, useState } from "react";
import FilteredRoutes from "@/app/components/FilteredRoutes";
import AreaRoute from "@/app/components/AreaRoute";
import SideBar from "@/app/components/SideBar";
import AddRoute from "@/app/components/AddRoute";

const Page = () => {
  const [isAreaChoosing, setIsAreaChoosing] = useState(false);
  const [isAddRoute, setIsAddRoute] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>("routes");

  useEffect(()=>{
  },[])

  return (
    <div className="min-h-screen w-auto flex flex-col">
      <SideBar
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
        setIsAreaChoosing={setIsAreaChoosing}
        setIsAddRoute={setIsAddRoute}
      />
      <div className="flex flex-col">
        <div className="" style={{ width: `calc(100% - 250px)` }}>
          {!isAreaChoosing && !isAddRoute ? (
            <div>
              <div
                dir="rtl"
                className="flex flex-col md:flex-row justify-around gap-4"
              >
                {/* רכיבי שדה הכתובת, שינוי פרופיל ובחירת אזור */}
                {/* {selectedRoute === "routes" && (
              <div className="flex flex-col border-l-2 p-2 md:gap-4 md:flex-row">
                <div className="flex flex-col w-[300px] md:w-auto gap-4">
                  <AddressSearch />
                  <button
                    onClick={() => setIsAreaChoosing(true)}
                    className="px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition duration-300 w-full md:w-auto"
                  >
                    סמן אזור נבחר
                  </button>
                  <div
                    className="cursor-pointer flex justify-center"
                    onClick={() => router.push("/pages/editUser")}
                  >
                    <Image
                      src="https://res.cloudinary.com/dltlyphap/image/upload/v1733825852/user_crv80f.png"
                      height={70}
                      width={70}
                      alt="profil edit"
                    />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mt-4 px-4 py-2 bg-red-600 text-white font-medium text-sm rounded-lg shadow hover:bg-red-700 hover:shadow-lg transition duration-300"
                  >
                    התנתקות
                  </button>
                </div>
              </div>
            )} */}

                {/* המסלולים המוצגים */}
                <div dir="ltr" className="w-full md:w-auto mb-3">
                  <FilteredRoutes
                    selectedRoute={selectedRoute}
                    setSelectedRoute={setSelectedRoute}
                    setIsAreaChoosing={setIsAreaChoosing}
                    setIsAddRoute={setIsAddRoute}
                  />
                </div>
              </div>
            </div>
          ) : isAreaChoosing ? (
            <AreaRoute setIsAreaChoosing={setIsAreaChoosing} />
          ) : (
            <AddRoute setIsAddRoute={setIsAddRoute} />
          )}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Page;
