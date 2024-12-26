"use client"
import React, { useEffect, useState } from "react";
import CardMap from "./CardMap";
import Star from "./Star";
import Image from 'next/image';
import CloudinaryUploader from "./CloudinaryUploader";
import { editRoutes } from "../services/routeService";
import IRoute from "../types/routes";
import { fetchRouteById } from "../functions/routesFunctions";
import { PopUpRouteProps } from "../types/props/PopUpRouteProps";

const PopUpRoute: React.FC<PopUpRouteProps> = ({ onClose, routeId, filtered }) => {
  const [pictures, setPictures] = useState<string[]>([]);
  const [route, setRoute] = useState<IRoute>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function fetchRoute() {
      const newRoute = await fetchRouteById(routeId.toString());

      if (newRoute) {
        setRoute(newRoute);
        setPictures(newRoute.gallery);
        setIsVisible(true);
      }
    }
    fetchRoute();
  }, []);

  useEffect(() => {
    async function func() {
      if (route && pictures && pictures.length > route.gallery.length) {
        const response = await editRoutes(routeId.toString(), undefined, pictures);
        setRoute(response);
        setPictures(response.gallery);
      }
    }
    func();
  }, [pictures]);

  useEffect(() => {
    if (!isHovered && pictures.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pictures.length);
      }, 1300);
      return () => clearInterval(interval);
    }
  }, [isHovered, pictures.length]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  console.log(routeId);
  
  return (
    <div
    className={`fixed top-0 right-0 h-full bg-white shadow-lg p-6 overflow-y-auto z-50 transition-transform duration-[500ms] transform sm:w-full md:w-2/3 lg:w-1/2 mt-20`}
        >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        X
      </button>
      <h2 className="text-2xl font-bold mb-4">פרטי מסלול</h2>
      {!route ? (
        <p>Loading...</p>
      ) : (
        <>
          <CardMap points={route.pointsArray} route={route} expanded={true} filtered={filtered}/>
          <Star rate={route.rate} filtered={1} onClick={() => console.log("pres")} />
          <p>{route.description}</p>
          {pictures && pictures.length > 0 && (
            <div className="flex flex-col items-center">
              <div 
                className="relative w-[300px] h-[200px] overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Image
                  className="rounded-md object-cover w-[300px] h-[200px]"
                  src={pictures[currentImageIndex]}
                  height={200}
                  width={300}
                  alt={`Image ${currentImageIndex}`}
                  priority
                />
              </div>
              <div className="flex mt-2">
                {pictures.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 mx-1 rounded-full ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-400'}`}
                  />
                ))}
              </div>
            </div>
          )}
          {filtered !== 1 &&
            <CloudinaryUploader setPictures={setPictures} />
          }
        </>
      )}
    </div>
  );
};

export default PopUpRoute;
