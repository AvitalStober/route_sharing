"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import CloudinaryUploader from "./CloudinaryUploader";
import Image from "next/image";
import {
  GoogleMap,
  DirectionsRenderer,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  calculateRoute,
  handleMapClick,
  resetMap,
} from "../functions/addRouteFunctions";
import { getUserAddress } from "../functions/usersFunctions";

const AddRoute = () => {
  // route/user information
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState<string[]>([]);
  // route details
  const [address, setAddress] = useState(""); // לשמור את הכתובת
  const mapRef = useRef<google.maps.Map | null>(null); // ה-ref של המפה
  const autocompleteRef = useRef<HTMLInputElement | null>(null); // ה-ref עבור ה-input של הכתובת
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 32.0853,
    lng: 34.7818,
  });
  const [routePoints, setRoutePoints] = useState<google.maps.LatLngLiteral[]>(
    []
  );
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  // make thw map disable after calaulate route
  const [disableMapClick, setDisableMapClick] = useState(false); // שליטה על קליקים במפה

  const router = useRouter();

  // map loading
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLMAPS_API_KEY || "",
    libraries: ["geometry", "places"],
    language: "he",
  });

  useEffect(() => {
    const initializeAddress = async () => {
      // קריאה לכתובת המשתמש
      const userAddress = await getUserAddress();
      setAddress(userAddress!);

      // שימוש ב-Geocoding API לתרגום הכתובת לקואורדינטות
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: userAddress }, (results, status) => {
        if (status === "OK" && results && results[0].geometry.location) {
          const location = results[0].geometry.location;

          // עדכון מרכז המפה למיקום הכתובת
          setCenter({
            lat: location.lat(),
            lng: location.lng(),
          });

          // הוספת הכתובת לנקודת מסלול
          setRoutePoints((prevPoints) => [
            ...prevPoints,
            { lat: location.lat(), lng: location.lng() },
          ]);

          // זום למיקום הכתובת
          if (mapRef.current) {
            mapRef.current.setZoom(15);
          }
        } else {
          console.error("Geocoding failed: " + status);
        }
      });
    };

    if (isLoaded && autocompleteRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(
        autocompleteRef.current
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (place.geometry && place.geometry.location) {
          const location = place.geometry.location;

          // עדכון מרכז המפה
          setCenter({
            lat: location.lat(),
            lng: location.lng(),
          });

          // הוסף את הנקודה הנבחרת למסלול
          setRoutePoints(() => [{ lat: location.lat(), lng: location.lng() }]);
          // זום למיקום הנבחר
          if (mapRef.current) {
            mapRef.current.setZoom(20);
          }

          // עדכון הכתובת בתיבת החיפוש
          const formattedAddress = place.formatted_address || "";
          setAddress(formattedAddress);
        }
      });
    }

    // קריאה לפונקציה לאתחול הכתובת
    initializeAddress();
  }, [isLoaded]);

  return (
    <div className="flex">
      <div className="justify-center w-[40%]">
        <div
          onClick={() => {
            router.push("/pages/home");
          }}
          className="cursor-pointer font-bold rounded-lg m-2 p-2 w-[40px] bg-gray-100 hover:bg-gray-200 text-center"
        >
          ✕
        </div>
        <div className="flex justify-center text-center items-center m-4 space-x-2">
          <input
            ref={autocompleteRef}
            type="text"
            placeholder={address}
            // value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="px-4 py-2 border rounded"
          />
        </div>
        <div className="flex justify-center m-4">
          <textarea
            placeholder="הזן תיאור"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-2 border rounded"
          />
        </div>
        <CloudinaryUploader setPictures={setPictures} />
        <div className="flex justify-center mb-2 space-x-2">
          <button
            onClick={() =>
              calculateRoute(
                routePoints,
                description,
                pictures,
                setDirections,
                setDisableMapClick,
                router
              )
            }
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            חישוב מסלול ושליחה
          </button>
          <button
            onClick={() =>
              resetMap(
                setRoutePoints,
                setDirections,
                setDisableMapClick,
                mapRef,
                directions
              )
            }
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            איפוס מפה
          </button>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2
            md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {pictures.length > 0 &&
            pictures.map((image: string, index: number) => (
              <div key={index}>
                <Image
                  className="flex flex-wrap justify-center"
                  src={image}
                  height={300}
                  width={200}
                  alt="My cloudinary image"
                  priority
                />
              </div>
            ))}
        </div>
      </div>

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ inlineSize: "100%", blockSize: "100vh" }}
          center={center}
          zoom={15}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onClick={(event) =>
            handleMapClick(event, disableMapClick, setRoutePoints)
          }
        >
          {routePoints.map((point, index) => (
            <Marker key={index} position={point} />
          ))}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: "red",
                  strokeOpacity: 0.8,
                  strokeWeight: 5,
                },
              }}
            />
          )}
        </GoogleMap>
      ) : (
        <div>טעינת המפה...</div>
      )}
    </div>
  );
};

export default AddRoute;
