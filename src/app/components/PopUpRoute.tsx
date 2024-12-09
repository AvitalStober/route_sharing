import React from "react";
import CardMap from "./CardMap";
import { Types } from "mongoose";

interface PopUpRouteProps {
  onClose: () => void; // פונקציה לסגירת הפופאפ
  ownerId: Types.ObjectId;
  pointsArray: google.maps.LatLngLiteral[];
  description: string;
  rate: number;
  ratingNum: number;
  gallery: string[];
}

const PopUpRoute: React.FC<PopUpRouteProps> = ({ onClose, ownerId, pointsArray, description, rate, ratingNum, gallery }) => {
  return (
    <div
      className="fixed top-0 left-0 h-full w-1/3 bg-white shadow-lg p-6 overflow-y-auto z-50 transition-transform transform translate-x-0"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        X
      </button>
      <h2 className="text-2xl font-bold mb-4">Route Details</h2>
      <CardMap points={pointsArray} route={null}/>
      <p>{description}</p>
      
    </div>
  );
};

export default PopUpRoute;
