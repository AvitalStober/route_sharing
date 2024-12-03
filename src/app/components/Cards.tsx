// עמוד זה מקבל מערך של טיפוס מסלול
// מוצגים כרטיסים
// כל כרטיס מכיל את המידע הרלוונטי על המסלול
// כל כרטיס נשלח לקטמפוננטה MapComponent לשרטוט המסלול

import React from "react";
import CardMap from "./CardMap";
import RouteCardProps from "../types/‎RouteCardProps";

const RouteCard: React.FC<RouteCardProps> = ({ Routes }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Owners Routes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Routes.map((route, index) => (
          <div
            key={index}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <CardMap points={route.pointsArray} />
            <p>rate: {route.rate}</p>
            <p>numRate: {route.ratingNum}</p>
            <a
              href="#"
              className="inline-flex font-medium items-center text-blue-600 hover:underline mt-4"
            >
              See details
              <svg
                className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteCard;
