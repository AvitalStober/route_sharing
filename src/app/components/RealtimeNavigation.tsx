"use client";
import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import RealtimeNavigationProps from "@/app/types/props/RealtimeNavigationProps";
import { startNavigation } from "../functions/RealTimeNavigationFunction";
import { useRouter } from "next/navigation";
import { FaRegClock } from "react-icons/fa";
import { calculateRoute } from "../functions/cardsFunctions";

const RealtimeNavigation: React.FC<RealtimeNavigationProps> = ({
  waypoints = [],
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null); // שמירת רפרנס לקונטיינר של המפה
  const [, setGoogleMap] = useState<google.maps.Map | null>(null); // שמירת אובייקט המפה
  const [, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // אינדקס הנקודה הנוכחית במסלול
  const [instructions, setInstructions] = useState<string>(""); // הנחיות ניווט
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
    const [, setDirections] =
      useState<google.maps.DirectionsResult | null>(null);
  const router = useRouter();

  useEffect(() => {
      calculateRoute(waypoints, setDirections, setHours, setMinutes);
    }, [waypoints]);

  useEffect(() => {
    if (window.google && mapContainerRef.current) {
      const initializedMap = new google.maps.Map(mapContainerRef.current, {
        center: waypoints[0],
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
      });

      setGoogleMap(initializedMap);

      const newDirectionsService = new google.maps.DirectionsService();
      const newDirectionsRenderer = new google.maps.DirectionsRenderer({
        map: initializedMap,
        suppressMarkers: false,
      });

      setDirectionsService(newDirectionsService);
      setDirectionsRenderer(newDirectionsRenderer);

      console.log("googleMap", initializedMap);

      // התחלת הניווט
      startNavigation(
        newDirectionsService,
        newDirectionsRenderer,
        setErrorMessage,
        currentIndex,
        waypoints,
        setInstructions,
        setCurrentIndex,
        initializedMap
        // router
      );
    }
  }, []);

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="flex items-center w-[80%] mt-4 bg-gray-100">
        <div
          className="p-5 flex flex-col flex-1 justify-center w-[80%] border-r-2 border-black"
          dir="rtl"
        >
          <h3>הוראות ניווט:</h3>
          <p>{instructions}</p>
          {errorMessage && (
            <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
          )}
          {(hours === 0 || minutes === 0) && (
                    <div className="flex pt-6">
                      <div className="flex items-center p-1">
                        <FaRegClock />
                      </div>{" "}
                      <div className="flex items-center p-1">
                        {hours !== 0 && `${hours}`}
                        {hours !== 0 && minutes !== 0 && "."}
                        {minutes && `${minutes}`}
                        {hours == 0 && minutes !== 0 && " דק'"}
                        {hours !== 0 && minutes !== 0 && " שעות"}
                      </div>
                    </div>
                  )}
        </div>
        {/* חזרה לעמוד בית */}
        <div className="bg-white w-3 h-full"></div>
        <div
          onClick={() => {
            router.push("/pages/home");
          }}
          aria-label="Toggle Sidebar"
          className="cursor-pointer flex h-full items-center px-2"
        >
          <p className="text-red-800">ביטול</p>
        </div>
      </div>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyD3kFjuuxQTBDSd3D8aVx0YqtFxa9onxdI&libraries=places`}
        strategy="beforeInteractive"
      />
      <div
        ref={mapContainerRef}
        style={{ blockSize: "85%", inlineSize: "80%" }}
        className="border border-black rounded-xl m-4"
      />
    </div>
  );
};

export default RealtimeNavigation;