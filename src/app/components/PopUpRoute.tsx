import React, { useEffect, useState } from "react";
import CardMap from "./CardMap";
import { Types } from "mongoose";
import Star from "./Star";
import Image from 'next/image';
import CloudinaryUploader from "./CloudinaryUploader";
import { editRoutes } from "../services/routeService";


interface PopUpRouteProps {
  onClose: () => void; // פונקציה לסגירת הפופאפ
  routeId: string;
  ownerId: string;
  pointsArray: google.maps.LatLngLiteral[];
  description: string;
  rate: number;
  ratingNum: number;
  gallery: string[];
}

const PopUpRoute: React.FC<PopUpRouteProps> = ({ onClose, routeId, ownerId, pointsArray, description, rate, ratingNum, gallery }) => {
  console.log(gallery);
  const [pictures, setPictures] = useState<string[]>(gallery);
  useEffect(() => {
    if (pictures) {
      console.log("update", routeId);
      editRoutes(routeId, undefined, pictures);
    } else
      console.log("not update");
  }, [setPictures])
  return (
    <div className="fixed top-0 left-0 h-full w-4/9 bg-white shadow-lg p-6 overflow-y-auto z-50 transition-transform transform translate-x-0">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        X
      </button>
      <h2 className="text-2xl font-bold mb-4">Route Details</h2>
      <CardMap points={pointsArray} route={null} />
      <Star rate={rate} filtered={1} onClick={() => console.log("pres")} />
      <p>{description}</p>
      {pictures.length > 0 && (
        <div className="flex flex-wrap gap-4 items-center">
          {/* התמונות */}
          {pictures.map((image: string, index: number) => (
            <div key={index} className="flex-shrink-0">
              <Image
                className="rounded-md"
                src={image}
                height={100}
                width={100}
                alt={`Image ${index}`}
                priority
              />
            </div>
          ))}

          {/* כפתור העלאת תמונה */}
        </div>
      )}
      <CloudinaryUploader setPictures={setPictures} />
    </div>
  )
};

export default PopUpRoute;
