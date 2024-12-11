import React, { useEffect, useState } from "react";
import CardMap from "./CardMap";
import { Types } from "mongoose";
import Star from "./Star";
import Image from 'next/image';
import CloudinaryUploader from "./CloudinaryUploader";
import { editRoutes } from "../services/routeService";
import IRoute from "../types/routes";
import { fetchRouteById } from "../functions/routesFunctions";
import { PopUpRouteProps } from "../types/props/PopUpRouteProps";


const PopUpRoute: React.FC<PopUpRouteProps> = ({ onClose, routeId }) => {
  const [pictures, setPictures] = useState<string[]>([]);
  const [route, setRoute] = useState<IRoute>();
  useEffect(() => {
    async function fetchRoute() {
      const newRoute = await fetchRouteById(routeId.toString());
      
      if (newRoute) {
        console.log(newRoute, "@@@@@@@@@@@@@@@@@");
        setRoute(newRoute);
        setPictures(newRoute.gallery);
      }
    }
    fetchRoute();
  }, []);
  useEffect(() => {
    async function func() {
      console.log(pictures);
      if (route && pictures && pictures.length > route.gallery.length) {
        // Edit route when pictures are updated
        const response = await editRoutes(routeId.toString(), undefined, pictures);
        console.log(response, "response");
        setRoute(response);
        setPictures(response.gallery);
      }
    }
    func();
  }, [pictures]);

  return (
    <div className="fixed top-0 left-0 h-full w-4/9 bg-white shadow-lg p-6 overflow-y-auto z-50 transition-transform transform translate-x-0">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        X
      </button>
      <h2 className="text-2xl font-bold mb-4">Route Details</h2>
      {!route  ? (
        <p>Loading...</p> // טקסט טעינה כדי למנוע תקלות
      ) : (
        <>
          <CardMap points={route.pointsArray} route={route} expanded={true}/>
          <Star rate={route.rate} filtered={1} onClick={() => console.log("pres")} />
          <p>{route.description}</p>
          {pictures && pictures.length > 0 && (
            <div className="flex flex-wrap gap-4 items-center">
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
            </div>
          )}
          <CloudinaryUploader setPictures={setPictures} />
        </>
      )}
    </div>
  );
};

export default PopUpRoute;
