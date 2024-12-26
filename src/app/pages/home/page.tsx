// "use client";
// import React, { useState, useEffect } from "react";
// import Footer from "@/app/components/Footer";
// import FilteredRoutes from "@/app/components/FilteredRoutes";
// import AreaRoute from "@/app/components/AreaRoute";
// import SideBar from "@/app/components/SideBar";
// import AddRoute from "@/app/components/AddRoute";
// import { FaBars } from "react-icons/fa"; // אייקון של 3 פסים
// import { IoClose } from "react-icons/io5"; // אייקון של סגירה
// import AddressSearch from "@/app/components/AddressSearch";

// const Page = () => {
//   const [isAreaChoosing, setIsAreaChoosing] = useState(false);
//   const [isAddRoute, setIsAddRoute] = useState(false);
//   const [selectedRoute, setSelectedRoute] = useState<string | null>("routes");
//   const [isSideBarOpen, setIsSideBarOpen] = useState(false); // מצב תפריט צד בתצוגה קטנה

//   // ניטור שינוי גודל המסך
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         // גודל המסך עבור md ומעלה
//         setIsSideBarOpen(false); // תסגור את ה-SideBar ברגע שהמסך גדול מ-md
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize(); // קריאה ראשונית של הפונקציה בעת טעינת העמוד

//     return () => window.removeEventListener("resize", handleResize); // ניקוי לאחר סיום השימוש
//   }, []);

//   return (
//     <div className="min-h-screen w-auto flex flex-col">
//       {/* כותרת ואייקון של תפריט רק בתצוגת טלפון */}
//       <div className="flex items-center justify-between bg-gray-800 text-white p-4">
//         <h1 className="text-xl font-bold">Routes</h1>
//         <div className="flex">
//           <AddressSearch />
//           <button
//             onClick={() => setIsSideBarOpen(!isSideBarOpen)}
//             aria-label="Toggle Sidebar"
//             className="md:hidden ml-6"
//           >
//             {isSideBarOpen ? <IoClose size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* תצוגה ראשית */}
//       <div className="flex flex-1">
//         {/* SideBar - בתצוגת טלפון יופיע רק כשנלחץ על האייקון */}
//         <div
//           className={`fixed z-20 bg-white md:relative shadow-lg transition-transform duration-300 md:translate-x-0 w-64 h-screen overflow-y-auto ${
//             isSideBarOpen ? "translate-x-0 right-0 order-2" : "-translate-x-full"
//           } md:order-2 md:right-0 md:translate-x-0`}
//         >
//           <SideBar
//             selectedRoute={selectedRoute}
//             setSelectedRoute={setSelectedRoute}
//             setIsAreaChoosing={setIsAreaChoosing}
//             setIsAddRoute={setIsAddRoute}
//           />
//         </div>

//         {/* תוכן עמוד */}
//         <div
//           className={`flex-1 flex flex-col ${isSideBarOpen ? "md:ml-64" : ""}`} // מוודא שהתוכן יתפוס את הרוחב הנכון כש-SideBar פתוח
//         >
//           {!isAreaChoosing && !isAddRoute ? (
//             <div
//               dir="rtl"
//               className="flex flex-col md:flex-row justify-around gap-4"
//             >
//               {/* המסלולים המוצגים */}
//               <div className="w-full md:w-auto mb-3">
//                 <FilteredRoutes
//                   selectedRoute={selectedRoute}
//                   setSelectedRoute={setSelectedRoute}
//                   setIsAreaChoosing={setIsAreaChoosing}
//                   setIsAddRoute={setIsAddRoute}
//                 />
//               </div>
//             </div>
//           ) : isAreaChoosing ? (
//             <AreaRoute setIsAreaChoosing={setIsAreaChoosing} />
//           ) : (
//             <AddRoute setIsAddRoute={setIsAddRoute} />
//           )}
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;


"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/app/components/Footer";
import FilteredRoutes from "@/app/components/FilteredRoutes";
import AreaRoute from "@/app/components/AreaRoute";
import SideBar from "@/app/components/SideBar";
import AddRoute from "@/app/components/AddRoute";
import { FaBars } from "react-icons/fa"; // אייקון של 3 פסים
import { IoClose } from "react-icons/io5"; // אייקון של סגירה
import AddressSearch from "@/app/components/AddressSearch";

const Page = () => {
  const [isAreaChoosing, setIsAreaChoosing] = useState(false);
  const [isAddRoute, setIsAddRoute] = useState(false);
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

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* כותרת ואייקון של תפריט רק בתצוגת טלפון */}
      <div className="flex z-50 sticky top-0 items-center justify-between bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Routes</h1>
        <div className="flex">
          <AddressSearch />
          <button
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            aria-label="Toggle Sidebar"
            className="md:hidden ml-6"
          >
            {isSideBarOpen ? <IoClose size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* תצוגה ראשית */}
      <div className="flex flex-1">
        {/* SideBar - בתצוגת טלפון יופיע רק כשנלחץ על האייקון */}
        <div
          className={`fixed z-20 bg-white shadow-lg w-64 h-screen ${
            isSideBarOpen ? "translate-x-0 right-0" : "-translate-x-full"
          } md:translate-x-0 md:right-0 md:block md:scroll-container`}
        >
          <SideBar
            selectedRoute={selectedRoute}
            setSelectedRoute={setSelectedRoute}
            setIsAreaChoosing={setIsAreaChoosing}
            setIsAddRoute={setIsAddRoute}
          />
        </div>

        {/* תוכן עמוד */}
        <div
          className={`flex-1  md:mr-64`} // מוסיף margin ימין כשהסיידבר פתוח
        >
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
        </div>
      </div>
      <SideBar
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
        setIsAreaChoosing={setIsAreaChoosing}
        setIsAddRoute={setIsAddRoute}
      />
      <div className="col-span-1">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
