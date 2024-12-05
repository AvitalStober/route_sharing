// import React, { useState } from "react";
// import CardMap from "./CardMap";
// import RouteCardProps from "../types/‎RouteCardProps";
// import { addRouteToHistoryRoute } from "@/app/functions/cardsFunctions";

// const RouteCard: React.FC<RouteCardProps> = ({ Routes, filtered }) => {
//   const [selectedRoutes, setSelectedRoutes] = useState<Set<string>>(new Set());

//   // פונקציה ללחיצה על הכפתור
//   const handleSelectRoute = (routeId: string) => {
//     setSelectedRoutes((prevSelectedRoutes) => {
//       const updatedRoutes = new Set(prevSelectedRoutes);
//       if (updatedRoutes.has(routeId)) {
//         updatedRoutes.delete(routeId); // אם המסלול כבר נבחר, מסירים אותו
//       } else {
//         updatedRoutes.add(routeId); // אם לא, מוסיפים אותו
//         addRouteToHistoryRoute(routeId); // מוסיף את המסלול להיסטוריה
//       }
//       return updatedRoutes;
//     });
//   };
//   // טיפול בשגיאה אם המערך ריק
//   if (!Routes || Routes.length === 0) {
//     return (
//       <div className="text-center p-6 text-red-500">
//         <p>No routes available</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {Routes.map((route, index) => (
//           <div
//             key={index}
//             className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
//           >
//             <CardMap points={route.pointsArray} />
//             <p>rate: {route.rate}</p>
//             <p>numRate: {route.ratingNum}</p>
//             {filtered === 1 && (
//               <button
//                 onClick={() => handleSelectRoute(route._id as string)}
//                 className={`mt-4 px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 ${
//                   selectedRoutes.has(route._id as string)
//                     ? "bg-green-600 text-white hover:bg-green-700 cursor-not-allowed"
//                     : "bg-green-500 text-white hover:bg-green-600"
//                 }`}
//                 disabled={selectedRoutes.has(route._id as string)} // אם המסלול נבחר, הכפתור יהיה לא מאופשר
//               >
//                 {selectedRoutes.has(route._id as string)
//                   ? "Selected"
//                   : "Select Route"}
//               </button>
//             )}
            
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RouteCard;


import React, { useState } from "react";
import CardMap from "./CardMap";
import RouteCardProps from "../types/‎RouteCardProps";
import { addRouteToHistoryRoute } from "@/app/functions/cardsFunctions";

const RouteCard: React.FC<RouteCardProps> = ({ Routes, filtered }) => {
  const [selectedRoutes, setSelectedRoutes] = useState<Set<string>>(new Set());
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  // פונקציה ללחיצה על הכפתור
  const handleSelectRoute = (routeId: string) => {
    setSelectedRoutes((prevSelectedRoutes) => {
      const updatedRoutes = new Set(prevSelectedRoutes);
      if (updatedRoutes.has(routeId)) {
        updatedRoutes.delete(routeId); // אם המסלול כבר נבחר, מסירים אותו
      } else {
        updatedRoutes.add(routeId); // אם לא, מוסיפים אותו
        addRouteToHistoryRoute(routeId); // מוסיף את המסלול להיסטוריה
      }
      return updatedRoutes;
    });
  };

  // פונקציה לעדכון הדירוג
  const handleRating = (routeId: string, rating: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [routeId]: rating,
    }));
  };

  // טיפול בשגיאה אם המערך ריק
  if (!Routes || Routes.length === 0) {
    return (
      <div className="text-center p-6 text-red-500">
        <p>No routes available</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Routes.map((route, index) => {
          // חישוב הדירוג הכולל אם filtered === 1 או filtered === 3
          const calculatedRate =
            filtered === 1 || filtered === 3
              ? (route.rate * route.ratingNum + (route.rate + 1)) / route.ratingNum
              : route.rate; // אם filtered שווה 1 או 3, משתמשים בחישוב הנ"ל

          return (
            <div
              key={index}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <CardMap points={route.pointsArray} />
              {/* הצגת הדירוג */}
              {filtered === 1 || filtered === 3 ? (
                <p>rate: {calculatedRate.toFixed(2)}</p> // הצגת הדירוג המחושב
              ) : (
                <p>rate: {route.rate}</p> // הצגת הדירוג אם filtered שונה
              )}

              {/* הצגת כפתור הבחירה אם filtered === 1 */}
              {filtered === 1 && (
                <button
                  onClick={() => handleSelectRoute(route._id as string)}
                  className={`mt-4 px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 ${
                    selectedRoutes.has(route._id as string)
                      ? "bg-green-600 text-white hover:bg-green-700 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                  disabled={selectedRoutes.has(route._id as string)} // אם המסלול נבחר, הכפתור יהיה לא מאופשר
                >
                  {selectedRoutes.has(route._id as string)
                    ? "Selected"
                    : "Select Route"}
                </button>
              )}

              {/* הצגת כוכבי דירוג אם filtered === 2 */}
              {filtered === 2 && (
                <div className="flex items-center mt-4">
                  <span className="mr-2">rate:</span> {/* המילה rate לפני הכוכבים */}
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(route._id as string, star)}
                      className={`${
                        ratings[route._id as string] >= star
                          ? "text-yellow-500"
                          : "text-gray-400"
                      } text-2xl`} // גודל כוכב מוגדל
                    >
                      ★
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RouteCard;

