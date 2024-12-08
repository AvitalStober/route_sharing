// // components/MapLoader.tsx
// "use client";
// import { useJsApiLoader } from "@react-google-maps/api";

// const MapLoader = ({ children }: { children: React.ReactNode }) => {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLMAPS_API_KEY || "",
//     libraries: ["places", "geometry"],
//     language: "he",
//   });

//   if (!isLoaded) return <div>Loading map...</div>;

//   return <>{children}</>;
// };

// export default MapLoader;


// components/MapLoader.tsx
"use client";
// עמוד שבו נטענת המפה
// מונע טעינה כפולה של המפות

import { useJsApiLoader } from "@react-google-maps/api";

const MapLoader = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLMAPS_API_KEY || "",
    libraries: ["places", "geometry"], // ייבוא הספריות הנדרשות
    language: "he", // שפה עברית
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return <>{children}</>;
};

export default MapLoader;