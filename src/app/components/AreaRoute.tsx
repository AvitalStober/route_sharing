"use client";
import React, { useState, useRef, useEffect } from "react";
import { getUserAddress } from "../functions/usersFunctions";
import useStore from "@/app/store/store";
import AreaRouteProps from "../types/props/AreaRouteProps";
import {
  displayPoints,
  handleMapClick,
  resetMap,
} from "../functions/areaChoosingFunctions";
import {
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import IRoute from "../types/routes";

const AreaRoute: React.FC<AreaRouteProps> = ({ setIsAreaChoosing }) => {
  const [address, setAddress] = useState("");
  const [center, setCenter] = useState<google.maps.LatLngLiteral>();
  const polygonRef = useRef<google.maps.Polygon | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const autocompleteRef = useRef<HTMLInputElement | null>(null);
  const [areaPoints, setAreaPoints] = useState<google.maps.LatLngLiteral[]>([]);

  const Routes = useStore((state) => state.Routes);
  const setRoutes = useStore((state) => state.setRoutes);
  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const setLastPage = useStore((state) => state.setLastPage);
  const setChangeAddress = useStore((state) => state.setChangeAddress);
  setChangeAddress(address);

  const changeAddress = useStore((state) => state.changeAddress);
  const appendRoutes = (newRoutes: IRoute[]) => {
    if (newRoutes.length !== 0) {
      const newArray: IRoute[] = [...Routes, ...newRoutes];
      setRoutes(newArray);
    }
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLMAPS_API_KEY || "",
    libraries: ["geometry", "places"],
    language: "he",
  });

  useEffect(() => {
    const initialize = async () => {
      if (isLoaded && autocompleteRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(
          autocompleteRef.current
        );

        // קריאה לפונקציה אסינכרונית לקבלת כתובת המשתמש
        const userAddress = await getUserAddress();
        setAddress(userAddress!);

        // שימוש ב-Geocoding API כדי לקבל קואורדינטות של הכתובת
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: userAddress }, (results, status) => {
          if (status === "OK" && results && results[0].geometry.location) {
            const location = results[0].geometry.location;
            setCenter({
              lat: location.lat(),
              lng: location.lng(),
            });
            if (mapRef.current) {
              mapRef.current.setZoom(15);
            }
          } else {
            console.error("Geocoding failed: " + status);
          }
        });

        // מאזין לשינויים במיקום שנבחר בתיבת החיפוש
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();

          if (place.geometry && place.geometry.location) {
            const location = place.geometry.location;
            // עדכון מרכז המפה
            setCenter({
              lat: location.lat(),
              lng: location.lng(),
            });
            // זום למיקום הנבחר
            if (mapRef.current) {
              mapRef.current.setZoom(15);
            }
            // עדכון הכתובת בתיבת החיפוש
            const formattedAddress = place.formatted_address || ""; // אם לא נמצא, השתמש בברירת מחדל ריקה
            setAddress(formattedAddress);
          }
        });
      }
    };

    initialize();
  }, [isLoaded]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-[100%]">
        {/* חזרה לעמוד בית */}
        <div
          onClick={() => {
            setIsAreaChoosing(false);
          }}
          className="cursor-pointer font-bold rounded-lg m-2 p-2 w-[40px] bg-gray-100 hover:bg-gray-200 text-center"
        >
          ✕
        </div>
        {/* כתובת */}
        <div className="flex justify-center self-center items-center mb-4 mt-4 space-x-2">
          <input
            ref={autocompleteRef}
            type="text"
            placeholder={address}
            onChange={(e) => setAddress(e.target.value)}
            className="px-4 py-2 border rounded"
          />
        </div>
      </div>
      {/* כפתורי שליטה */}
      <div className="flex justify-center mb-4 space-x-2">
        <button
          onClick={() => resetMap(setAreaPoints)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          איפוס מפה
        </button>
        <button
          onClick={() => {
            debugger;
            const newPage = 1;
            setCurrentPage(newPage);
            {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              changeAddress &&
                displayPoints(
                  setRoutes,
                  setIsAreaChoosing,
                  areaPoints,
                  currentPage,
                  appendRoutes,
                  setLastPage
                );
            }
          }}
          disabled={areaPoints.length < 3} // הכפתור מושבת אם יש פחות מ-3 נקודות
          className={`px-4 py-2 rounded ${
            areaPoints.length < 3
              ? "bg-gray-300 text-gray-600 cursor-not-allowed" // סגנון לכפתור מושבת
              : "bg-yellow-500 text-white cursor-pointer" // סגנון לכפתור פעיל
          }`}
        >
          מציאת מסלולים
        </button>
      </div>

      {isLoaded ? (
        <div className="w-[80%] mb-2 border border-black rounded-xl">
          <GoogleMap
            mapContainerStyle={{
              inlineSize: "100%",
              blockSize: "500px",
              borderRadius: "11px",
            }}
            center={center}
            zoom={13}
            onClick={(event) =>
              handleMapClick(event, setAreaPoints, mapRef, polygonRef)
            }
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            {areaPoints.length > 2 && (
              <Polygon
                path={areaPoints}
                options={{
                  fillColor: "yellow",
                  fillOpacity: 0.4,
                  strokeColor: "yellow",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                }}
              />
            )}
            {areaPoints.map((point, index) => (
              <Marker
                key={`area-${index}`}
                position={point}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
                }}
              />
            ))}
          </GoogleMap>
        </div>
      ) : (
        <div>טוען מפה...</div>
      )}
    </div>
  );
};

export default AreaRoute;
