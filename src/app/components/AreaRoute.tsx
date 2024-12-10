"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import { getRoutesInChosenArea } from "../services/routeService";

// צריך להמיר את הכתובת של המשתמש כך שיהיה המרכז של המפה מיד כשנכנסים לעמוד................

const EreaRoute = () => {
  const [address, setAddress] = useState(""); // לשמור את הכתובת
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 32.0853,
    lng: 34.7818,
  });
  const polygonRef = useRef<google.maps.Polygon | null>(null); // לשמור את הפוליגון הצהוב
  const mapRef = useRef<google.maps.Map | null>(null); // ה-ref של המפה
  const autocompleteRef = useRef<HTMLInputElement | null>(null); // ה-ref עבור ה-input של הכתובת
  const [areaPoints, setAreaPoints] = useState<google.maps.LatLngLiteral[]>([]);

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
  }, [isLoaded]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newPoint = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      setAreaPoints((prevPoints) => {
        const updatedPoints = [...prevPoints, newPoint];
        console.log("Updated AreaPoints: ", updatedPoints);

        // בניית הפוליגון רק אם יש יותר מ-2 נקודות
        if (updatedPoints.length > 2) {
          const polygon = new google.maps.Polygon({
            paths: updatedPoints,
            fillColor: "yellow",
            fillOpacity: 0.1,
            strokeColor: "yellow",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          });
          polygon.setMap(mapRef.current);
          console.log("Polygon: ", polygon);

          polygonRef.current = polygon;
        }

        return updatedPoints;
      });
    }
  };

  // const calculateRoute = () => {
  //   const directionsService = new google.maps.DirectionsService();
  //   const request: google.maps.DirectionsRequest = {
  //     origin: routePoints[0],
  //     destination: routePoints[routePoints.length - 1],
  //     waypoints: routePoints.slice(1, -1).map((point) => ({
  //       location: point,
  //       stopover: true,
  //     })),
  //     travelMode: google.maps.TravelMode.WALKING,
  //   };

  //   directionsService.route(request, (result, status) => {
  //     if (status === google.maps.DirectionsStatus.OK && result) {
  //       const allRoutePoints: google.maps.LatLngLiteral[] = [];
  //       const route = result.routes[0];

  //       allRoutePoints.push({
  //         lat: route.legs[0].start_location.lat(),
  //         lng: route.legs[0].start_location.lng(),
  //       });

  //       route.legs.forEach((leg) => {
  //         leg.steps.forEach((step) => {
  //           allRoutePoints.push({
  //             lat: step.end_location.lat(),
  //             lng: step.end_location.lng(),
  //           });
  //         });
  //       });
  //       setDirections(result);
  //     } else {
  //       alert("לא ניתן לחשב מסלול.");
  //     }
  //   });
  // };

  const resetMap = () => {
    setAreaPoints([]);
  };

  const displayPoints = async () => {
    const inMyArea = await getRoutesInChosenArea(areaPoints);
    console.log(inMyArea);
    
  };

  const handleAddressSubmit = () => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results!.length > 0) {
        const location = results![0].geometry.location;
        console.log("location type ", typeof location);

        setCenter({
          lat: location.lat(),
          lng: location.lng(),
        });

        if (mapRef.current) {
          mapRef.current.setZoom(15);
        }
      } else {
        alert("כתובת לא נמצאה, נסה שוב.");
      }
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center mb-4 mt-4 space-x-2">
        <input
          ref={autocompleteRef}
          type="text"
          placeholder="הזן כתובת לחיפוש"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <button
          onClick={handleAddressSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          חפש כתובת
        </button>
      </div>
      <div className="flex justify-center mb-4 space-x-2">
        <button
          onClick={resetMap}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          איפוס מפה
        </button>
        <button
          onClick={displayPoints}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          מציאת מסלולים
        </button>
      </div>

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "500px" }}
          center={center}
          zoom={13}
          onClick={handleMapClick}
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
      ) : (
        <div>טוען מפה...</div>
      )}
    </div>
  );
};

export default EreaRoute;
