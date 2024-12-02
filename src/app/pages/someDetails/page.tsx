import CardMap from "@/app/components/CardMap";
import SomeDetails from "@/app/components/SomeDetails";
import React from "react";

const page = () => {
  const points: google.maps.LatLngLiteral[] = [
    { lat: 32.109333, lng: 34.855499 }, // נקודה 1
    { lat: 31.768319, lng: 35.21371 }, // נקודה 2
  ];
  return (
    <>
      <SomeDetails />
      <CardMap points={points} />
    </>
  );
};

export default page;