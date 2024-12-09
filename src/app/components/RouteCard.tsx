// import React from "react";
// import CardMap from "./CardMap";
// import RouteCardProps from "../types/‎RouteCardProps";
// import {
//   addRouteToHistoryRoute,
//   raiting,
// } from "@/app/functions/cardsFunctions";
// import Star from "@/app/components/Star";

// const RouteCard: React.FC<RouteCardProps> = ({ Routes, filtered }) => {
//   // טיפול בשגיאה אם המערך ריק
//   if (!Routes || Routes.length === 0) {
//     return (
//       <div className="text-center p-6 text-red-500">
//         <p>No routes available</p>
//       </div>
//     );
//   }

//   // פונקציה לעדכון הדירוג
//   const handleStarClick = async (routeId: string, new_rate: number) => {
//     console.log(routeId, new_rate);

//     const updateRate = await raiting(routeId, new_rate);
//     console.log(updateRate);
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {Routes.map((route, index) => (
//           <div
//             key={index}
//             className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
//           >
//             <CardMap points={route.pointsArray} />
//             {filtered != 2 ? (
//               <Star key={index} rate={route.rate!} />
//             ) : (
//               <div className="m-2">
//                 <Star
//                   rate={route.rate!}
//                   onClick={() =>
//                     handleStarClick(route._id as string, route.rate!)
//                   } // שליחת הדירוג לפונקציה
//                 />
//               </div>
//             )}
//             {filtered === 1 && (
//               <div className="mt-2">
//                 <button
//                   onClick={() => addRouteToHistoryRoute(route._id as string)}
//                   className={`px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 bg-green-500 text-white hover:bg-green-600`}
//                 >
//                   Select Route
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RouteCard;

// import React from "react";
// import CardMap from "./CardMap";
// import RouteCardProps from "../types/‎RouteCardProps";
// import {
//   addRouteToHistoryRoute,
//   raiting,
// } from "@/app/functions/cardsFunctions";
// import Star from "@/app/components/Star";

// const RouteCard: React.FC<RouteCardProps> = ({ Routes, filtered }) => {
//   // טיפול בשגיאה אם המערך ריק
//   if (!Routes || Routes.length === 0) {
//     return (
//       <div className="text-center p-6 text-red-500">
//         <p>No routes available</p>
//       </div>
//     );
//   }

//   // פונקציה לעדכון הדירוג
//   const handleStarClick = async (routeId: string, new_rate: number) => {
//     console.log("Clicked star:", new_rate);

//     if (filtered === 2) {
//       const updateRate = await raiting(routeId, new_rate);
//       console.log("Updated rate:", updateRate);
//     }
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {Routes.map((route, index) => (
//           <div
//             key={index}
//             className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
//           >
//             <CardMap points={route.pointsArray} />
//             <Star
//               key={index}
//               rate={route.rate!}
//               filtered={filtered}
//               onClick={(newRate) =>
//                 filtered === 2 && handleStarClick(route._id as string, newRate)
//               }
//             />
//             {filtered === 1 && (
//               <div className="mt-2">
//                 <button
//                   onClick={() => addRouteToHistoryRoute(route._id as string)}
//                   className={`px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 bg-green-500 text-white hover:bg-green-600`}
//                 >
//                   Select Route
//                 </button>
//               </div>
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
import {
  addRouteToHistoryRoute,
  raiting,
} from "@/app/functions/cardsFunctions";
import Star from "@/app/components/Star";

const RouteCard: React.FC<RouteCardProps> = ({ Routes, filtered }) => {
  const [selectedRatings, setSelectedRatings] = useState<{
    [routeId: string]: number;
  }>({});

  // טיפול בשגיאה אם המערך ריק
  if (!Routes || Routes.length === 0) {
    return (
      <div className="text-center p-6 text-red-500">
        <p>No routes available</p>
      </div>
    );
  }

  // פונקציה לעדכון הדירוג
  const handleStarClick = async (routeId: string, new_rate: number) => {
    if (selectedRatings[routeId]) return; // אם כבר נבחר דירוג, לא לעשות כלום

    console.log("Clicked star:", new_rate);

    if (filtered === 2) {
      await raiting(routeId, new_rate); // שליחת דירוג לשרת
      setSelectedRatings((prev) => ({
        ...prev,
        [routeId]: new_rate,
      }));
    }
  };

  return (
    <div>
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
              } // אם filtered===2, להציג דירוג מ- selectedRatings
              filtered={filtered}
              onClick={(newRate) =>
                handleStarClick(route._id as string, newRate)
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
      </div>
    </div>
  );
};

export default RouteCard;
