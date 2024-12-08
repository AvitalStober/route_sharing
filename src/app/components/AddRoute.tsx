"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { addRoute } from "../services/routeService";
import CloudinaryUploader from "./CloudinaryUploader";
import Image from "next/image";

const Map = () => {
  const [userData, setUserData] = useState({id: '', email: '', name: ''});
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState<string[]>([]);
  const [address, setAddress] = useState(""); // לשמור את הכתובת
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 32.0853,
    lng: 34.7818,
  });
  const mapRef = useRef<google.maps.Map | null>(null); // ה-ref של המפה
  const autocompleteRef = useRef<HTMLInputElement | null>(null); // ה-ref עבור ה-input של הכתובת
  const [routePoints, setRoutePoints] = useState<google.maps.LatLngLiteral[]>(
    []
  );
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [disableMapClick, setDisableMapClick] = useState(false); // שליטה על קליקים במפה

  let userFromLocal: string;
  if (typeof window !== "undefined") {
    userFromLocal = localStorage.getItem("userToken")!;
  }
  setUserData(JSON.parse(userFromLocal!));

  const router = useRouter();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLMAPS_API_KEY || "",
    libraries: ["geometry", "places"],
    language: "he",
  });

  useEffect(() => {
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
          setRoutePoints((prevPoints) => [
            ...prevPoints,
            { lat: location.lat(), lng: location.lng() },
          ]);

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
  }, [isLoaded]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (disableMapClick) return;
    if (event.latLng) {
      const newPoint = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      setRoutePoints((prevPoints) => [...prevPoints, newPoint]);
    }
  };

  const calculateRoute = () => {
    if (routePoints.length < 2) {
      alert("עליך לבחור לפחות שתי נקודות למסלול.");
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const request: google.maps.DirectionsRequest = {
      origin: routePoints[0],
      destination: routePoints[routePoints.length - 1],
      waypoints: routePoints.slice(1, -1).map((point) => ({
        location: point,
        stopover: true,
      })),
      travelMode: google.maps.TravelMode.WALKING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        const allRoutePoints: google.maps.LatLngLiteral[] = [];
        const route = result.routes[0];

        allRoutePoints.push({
          lat: route.legs[0].start_location.lat(),
          lng: route.legs[0].start_location.lng(),
        });

        route.legs.forEach((leg) => {
          leg.steps.forEach((step) => {
            allRoutePoints.push({
              lat: step.end_location.lat(),
              lng: step.end_location.lng(),
            });
          });
        });

        addRoute({
          ownerId: userData.id,
          pointsArray: allRoutePoints,
          description: description,
          gallery: pictures,
        });

        setDirections(result);
        setDisableMapClick(true);
        router.push("/pages/home");
      } else {
        alert("לא ניתן לחשב מסלול.");
      }
    });
  };

  // פונקציה להסרת ה-DirectionsRenderer מהמפה
  const clearDirectionsRenderer = () => {
    if (mapRef.current && directions) {
      directions.routes.forEach((route) => {
        route.overview_path.forEach((path) => {
          const line = new google.maps.Polyline({
            path: [path],
            strokeColor: "red",
            strokeOpacity: 0.8,
            strokeWeight: 5,
          });
          line.setMap(mapRef.current);
        });
      });
    }
  };

  const resetMap = () => {
    console.log("reset route");

    setRoutePoints([]);
    setDirections(null);
    clearDirectionsRenderer(); // מסיר את ה-DirectionsRenderer מהמפה
    setDisableMapClick(false);
  };

  const handleAddressSubmit = () => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results!.length > 0) {
        const location = results![0].geometry.location;

        setCenter({
          lat: location.lat(),
          lng: location.lng(),
        });

        setRoutePoints((prevPoints) => [
          ...prevPoints,
          { lat: location.lat(), lng: location.lng() },
        ]);

        if (mapRef.current) {
          mapRef.current.setZoom(15);
        }
      } else {
        alert("כתובת לא נמצאה, נסה שוב.");
      }
    });
  };

  return (
    <div className="flex">
      <div className="justify-center w-[40%]">
        <div className="flex justify-center text-center items-center m-4 space-x-2">
          <button
            onClick={handleAddressSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            התחלה
          </button>
          <input
            ref={autocompleteRef}
            type="text"
            placeholder="הזן כתובת יציאה"
            value={address}
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
        <div className="flex justify-center mb-2 space-x-2">
          <button
            onClick={calculateRoute}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            חישוב מסלול
          </button>
          <button
            onClick={resetMap}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            איפוס מפה
          </button>
        </div>
        <CloudinaryUploader pictures={pictures} setPictures={setPictures} />

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
          mapContainerStyle={{ width: "100%", height: "100vh" }}
          center={center}
          zoom={15}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onClick={handleMapClick}
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

export default Map;
