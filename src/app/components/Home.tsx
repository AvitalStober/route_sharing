"use client";
import React, { useState, useRef, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import Footer from "./Footer";
import RouteCard from "./RouteCard";
import IRoute from "../types/routes";
import mongoose from "mongoose";

const Home = () => {
  const [mapAddress, setMapAddress] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [address, setAddress] = useState("");
  const mapRef = useRef<google.maps.Map | null>(null);
  const autocompleteRef = useRef<HTMLInputElement | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLMAPS_API_KEY || "",
    libraries: ["places", "geometry"],
    language: "he",
    id: "google-maps-api", // הוסף מזהה ייחודי
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

          setMapAddress({
            lat: location.lat(),
            lng: location.lng(),
          });

          const formattedAddress = place.formatted_address || ""; // עדכון הכתובת בעברית
          setAddress(formattedAddress);

          if (mapRef.current) {
            mapRef.current.setZoom(15);
          }
        }
      });
    }
  }, [isLoaded]);

  const ownerRoutes: IRoute[] = [
    {
      ownerId: new mongoose.Types.ObjectId("674ec0d30ae8e9eb89ce343b"),
      pointsArray: [
        {
          lat: 31.427713,
          lng: 34.5817887,
        },
        {
          lat: 31.4280065,
          lng: 34.5826558,
        },
        {
          lat: 31.4285608,
          lng: 34.5834734,
        },
        {
          lat: 31.4284188,
          lng: 34.5836272,
        },
        {
          lat: 31.4285612,
          lng: 34.583473,
        },
        {
          lat: 31.4290319,
          lng: 34.5840056,
        },
        {
          lat: 31.4274801,
          lng: 34.5857419,
        },
        {
          lat: 31.4278171,
          lng: 34.5869573,
        },
        {
          lat: 31.4273204,
          lng: 34.5873064,
        },
        {
          lat: 31.4269101,
          lng: 34.5868045,
        },
      ],
      description: "werty",
      rate: 4,
      ratingNum: 4,
      gallery: ["w"],
    },
    {
      ownerId: new mongoose.Types.ObjectId("674ec0d30ae8e9eb89ce343b"),
      pointsArray: [
        { lat: 32.085299, lng: 34.781767 }, // תל אביב
        { lat: 32.07409, lng: 34.771019 }, // רמת גן
      ],
      description: "Routes across various cities in Israel",
      rate: 4,
      ratingNum: 100,
      gallery: ["image1.jpg", "image2.jpg"],
    },
  ];

  return (
    <div className="flex flex-col">
      {isLoaded ? (
        <>
          <div className="flex justify-center items-center mb-4 mt-4 space-x-2">
            <input
              ref={autocompleteRef}
              type="text"
              placeholder="הזן כתובת לחיפוש"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="px-4 py-2 border rounded"
            />
          </div>
          {/* <h1>קו רוחב: {mapAddress?.lat}</h1>
          <h1>קו אורך: {mapAddress?.lng}</h1> */}
          <RouteCard ownerRoutes={ownerRoutes} />
          {/* <CardMap points={points} /> */}
        </>
      ) : (
        <div>טוען...</div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
