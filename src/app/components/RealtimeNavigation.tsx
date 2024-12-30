"use client";
import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import RealtimeNavigationProps from "@/app/types/props/RealtimeNavigationProps";
import { startNavigation } from "../functions/RealTimeNavigationFunction";
// import { useRouter } from "next/navigation";

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
  // const router = useRouter();

  useEffect(() => {    
    if (window.google && mapContainerRef.current) {
      const initializedMap = new google.maps.Map(mapContainerRef.current, {
        center: waypoints[0],
        zoom: 15,
        disableDefaultUI: true, // מבטל את ה-UI של המפה
        zoomControl: true, // מאפשר את כפתור הזום
        streetViewControl: false, // מבטל את תצוגת הרחוב
        mapTypeControl: false, // מבטל את אפשרות החלפת סוג המפה
      });
      setGoogleMap(initializedMap);

      const newDirectionsService = new google.maps.DirectionsService();
      const newDirectionsRenderer = new google.maps.DirectionsRenderer({
        map: initializedMap,
        suppressMarkers: false,
      });

      setDirectionsService(newDirectionsService);
      setDirectionsRenderer(newDirectionsRenderer);

      // התחלת הניווט
      startNavigation(
        newDirectionsService,
        newDirectionsRenderer,
        setErrorMessage,
        currentIndex,
        waypoints,
        setInstructions,
        setCurrentIndex,
        // router
      );
    }
  }, []);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyD3kFjuuxQTBDSd3D8aVx0YqtFxa9onxdI&libraries=places`}
        strategy="beforeInteractive"
      />
      <div
        ref={mapContainerRef}
        style={{ blockSize: "80vh", inlineSize: "100%" }}
      />
      <div className="p-5 bg-gray-100" dir="rtl">
        <h3>הוראות ניווט:</h3>
        <p>{instructions}</p>
        {errorMessage && (
          <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default RealtimeNavigation;
