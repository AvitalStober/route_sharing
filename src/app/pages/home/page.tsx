// "use client";
// import Footer from "@/app/components/Footer";
// import AddressSearch from "@/app/components/AddressSearch";
// import React, { useState } from "react";
// import FilteredRoutes from "@/app/components/FilteredRoutes";
// import AreaRoute from "@/app/components/AreaRoute";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// const Page = () => {
//   const [isAreaChoosing, setIsAreaChoosing] = useState(false);
//   const router = useRouter();
//   const [selectedRoute, setSelectedRoute] = useState<string | null>("routes");

//   return (
//     <div className="min-h-screen flex flex-col">
//       {!isAreaChoosing ? (
//         <>
//           <main className="flex-grow">
//             <div className="flex justify-around px-4 py-2">
//               <div className="flex-shrink-0">
//                 <FilteredRoutes
//                   selectedRoute={selectedRoute}
//                   setSelectedRoute={setSelectedRoute}
//                 />
//               </div>
//               {selectedRoute === "routes" && (
//                 <div className="flex flex-col flex-shrink-0 items-center">
//                   <AddressSearch />
//                   <button
//                     onClick={() => {
//                       setIsAreaChoosing(true);
//                     }}
//                     className="m-4 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition duration-300"
//                   >
//                     סמן אזור נבחר
//                   </button>
//                   <div
//                     className="cursor-pointer"
//                     onClick={() => {
//                       router.push("/pages/editUser");
//                     }}
//                   >
//                     <Image
//                       className="flex flex-wrap justify-center"
//                       src="https://res.cloudinary.com/dltlyphap/image/upload/v1733825852/user_crv80f.png"
//                       height={70}
//                       width={70}
//                       alt="profil edit"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </main>
//           <Footer />
//         </>
//       ) : (
//         <AreaRoute setIsAreaChoosing={setIsAreaChoosing} />
//       )}
//     </div>
//   );
// };

// export default Page;

// "use client";
// import Footer from "@/app/components/Footer";
// import AddressSearch from "@/app/components/AddressSearch";
// import React, { useState } from "react";
// import FilteredRoutes from "@/app/components/FilteredRoutes";
// import AreaRoute from "@/app/components/AreaRoute";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// const Page = () => {
//   const [isAreaChoosing, setIsAreaChoosing] = useState(false);
//   const router = useRouter();
//   const [selectedRoute, setSelectedRoute] = useState<string | null>("routes");

//   return (
//     <div className="min-h-screen w-auto flex flex-col">
//       {!isAreaChoosing ? (
//         <>
//           {/* <main className="flex-grow"> */}
//             <div className="flex justify-between px-4 py-2">
//               <div className="">
//                 <FilteredRoutes
//                   selectedRoute={selectedRoute}
//                   setSelectedRoute={setSelectedRoute}
//                 />
//               </div>
//               {selectedRoute === "routes" && (
//                 <div className="flex flex-col flex-shrink-0 items-center">
//                   <AddressSearch />
//                   <button
//                     onClick={() => {
//                       setIsAreaChoosing(true);
//                     }}
//                     className="m-4 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition duration-300"
//                   >
//                     סמן אזור נבחר
//                   </button>
//                   <div
//                     className="cursor-pointer"
//                     onClick={() => {
//                       router.push("/pages/editUser");
//                     }}
//                   >
//                     <Image
//                       className="flex flex-wrap justify-center"
//                       src="https://res.cloudinary.com/dltlyphap/image/upload/v1733825852/user_crv80f.png"
//                       height={70}
//                       width={70}
//                       alt="profil edit"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           {/* </main> */}
//           <Footer />
//         </>
//       ) : (
//         <AreaRoute setIsAreaChoosing={setIsAreaChoosing} />
//       )}
//     </div>
//   );
// };

// export default Page;

"use client";
import Footer from "@/app/components/Footer";
import AddressSearch from "@/app/components/AddressSearch";
import React, { useState } from "react";
import FilteredRoutes from "@/app/components/FilteredRoutes";
import AreaRoute from "@/app/components/AreaRoute";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isAreaChoosing, setIsAreaChoosing] = useState(false);
  const router = useRouter();
  const [selectedRoute, setSelectedRoute] = useState<string | null>("routes");

  const handleLogout = () => {
    const confirmLogout = window.confirm("האם אתה בטוח שברצונך להתנתק?");
    if (confirmLogout) {
      // מחיקת הטוקן מהסטור
      if (typeof window === "undefined") {
        return null;
      }
      localStorage.removeItem("userToken");
      router.push("/pages/login");
    }
  };

  return (
    <div className="min-h-screen w-auto flex flex-col">
      {!isAreaChoosing ? (
        <>
          <div
            dir="rtl"
            className="flex flex-col md:flex-row justify-around gap-4"
          >
            {/* רכיבי שדה הכתובת, שינוי פרופיל ובחירת אזור */}
            {(selectedRoute === "routes" || selectedRoute === "chosenArea") && (
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
            )}

            {/* המסלולים המוצגים */}
            <div dir="ltr" className="w-full md:w-auto mb-3">
              <FilteredRoutes
                selectedRoute={selectedRoute}
                setSelectedRoute={setSelectedRoute}
              />
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <AreaRoute setIsAreaChoosing={setIsAreaChoosing} />
      )}
    </div>
  );
};

export default Page;
