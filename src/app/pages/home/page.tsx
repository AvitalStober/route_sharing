
"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/app/components/Footer";

import FilteredRoutes from "@/app/components/FilteredRoutes";
import AreaRoute from "@/app/components/AreaRoute";
import SideBar from "@/app/components/SideBar";
import AddRoute from "@/app/components/AddRoute";
import { FaBars } from "react-icons/fa"; // אייקון של 3 פסים
import { IoClose } from "react-icons/io5"; // אייקון של סגירה
import EditUser from "@/app/components/EditUser";
import HomePage from "../homePage/page";
import useStore from "@/app/store/store";

const Page = () => {
  const [isAreaChoosing, setIsAreaChoosing] = useState(false);
  const [isAddRoute, setIsAddRoute] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<string | null>("routes");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false); // מצב תפריט צד בתצוגה קטנה

  // ניטור שינוי גודל המסך
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // גודל המסך עבור md ומעלה
        setIsSideBarOpen(false); // תסגור את ה-SideBar ברגע שהמסך גדול מ-md
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // קריאה ראשונית של הפונקציה בעת טעינת העמוד

    return () => window.removeEventListener("resize", handleResize); // ניקוי לאחר סיום השימוש
  }, []);
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
                <div className="w-full md:w-auto mb-3">
                  <FilteredRoutes
                    selectedRoute={selectedRoute}
                    setSelectedRoute={setSelectedRoute}
                    setIsAreaChoosing={setIsAreaChoosing}
                    setIsAddRoute={setIsAddRoute}
                    setIsHomePage={setIsHomePage}
                    setIsEditUser={setIsEditUser}
                  />
                </div>
              </div>
            </div>
          ) : isAreaChoosing ? (
            <AreaRoute setIsAreaChoosing={setIsAreaChoosing} />
          ) : isAddRoute ? (
            <AddRoute setIsAddRoute={setIsAddRoute} />
          ) : isEditUser?(
<EditUser setIsEditUser={setIsEditUser} />
          ):
          (
            isHomePage && (
              <div dir="ltr" className="w-full md:w-auto mb-3">
                <HomePage />
              </div>
            )
         }
          <Footer />
        </div>
      </div>
     
  
};

export default Page;
