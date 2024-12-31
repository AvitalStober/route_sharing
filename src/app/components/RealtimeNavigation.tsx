"use client";
import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import RealtimeNavigationProps from "@/app/types/props/RealtimeNavigationProps";
import { startNavigation } from "../functions/RealTimeNavigationFunction";
// import { startNavigation } from "../functions/RealTimeNavigationFunction";
import { useRouter } from "next/navigation";

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
const router=useRouter()
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
        setCurrentIndex
        // router
      );
    }
  }, []);

  return (
    <div className="h-screen flex flex-col items-center">
      {/* <div className="bg-white w-3 h-full"></div> */}

      <div 
        onClick={() => {
          router.push("/pages/home");
        }}
        aria-label="Toggle Sidebar"
        className="cursor-pointer flex h-full items-center px-2"
      >
        <p className="text-red-800">ביטול</p>
      </div>

      <div
        className="p-5 flex flex-col flex-1 justify-center bg-gray-100 w-[80%] mt-4 border-r-2 border-black"
        dir="rtl"
      >
        <h3>הוראות ניווט:</h3>
        <p>{instructions}</p>
        {errorMessage && (
          <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
        )}
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

// // עמוד ראשי
// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import Script from "next/script";
// import RealtimeNavigationProps from "@/app/types/props/RealtimeNavigationProps";
// import { startNavigation } from "../functions/RealTimeNavigationFunction";

// const RealtimeNavigation: React.FC<RealtimeNavigationProps> = ({
//   waypoints = [],
// }) => {
//   const mapContainerRef = useRef<HTMLDivElement>(null); // שמירת רפרנס לקונטיינר של המפה
//   const [, setGoogleMap] = useState<google.maps.Map | null>(null); // שמירת אובייקט המפה
//   const [, setDirectionsService] =
//     useState<google.maps.DirectionsService | null>(null);
//   const [, setDirectionsRenderer] =
//     useState<google.maps.DirectionsRenderer | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0); // אינדקס הנקודה הנוכחית במסלול
//   const [instructions, setInstructions] = useState<string>(""); // הנחיות ניווט
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   // useEffect(() => {
//   //   if (navigator.geolocation && mapContainerRef.current) {
//   //     navigator.geolocation.getCurrentPosition(
//   //       (position) => {
//   //         const userLocation = {
//   //           lat: position.coords.latitude,
//   //           lng: position.coords.longitude,
//   //         };

//   //         if (window.google && mapContainerRef.current) {
//   //           const initializedMap = new google.maps.Map(mapContainerRef.current, {
//   //             center: userLocation, // מיקום המשתמש
//   //             zoom: 15,
//   //             disableDefaultUI: true, // מבטל את ה-UI של המפה
//   //             zoomControl: true, // מאפשר את כפתור הזום
//   //             streetViewControl: false, // מבטל את תצוגת הרחוב
//   //             mapTypeControl: false, // מבטל את אפשרות החלפת סוג המפה
//   //           });
//   //           setGoogleMap(initializedMap);

//   //           const newDirectionsService = new google.maps.DirectionsService();
//   //           const newDirectionsRenderer = new google.maps.DirectionsRenderer({
//   //             map: initializedMap,
//   //             suppressMarkers: false,
//   //           });

//   //           setDirectionsService(newDirectionsService);
//   //           setDirectionsRenderer(newDirectionsRenderer);

//   //           // התחלת הניווט
//   //           startNavigation(
//   //             newDirectionsService,
//   //             newDirectionsRenderer,
//   //             setErrorMessage,
//   //             currentIndex,
//   //             waypoints,
//   //             setInstructions,
//   //             setCurrentIndex
//   //           );
//   //         }
//   //       },
//   //       (error) => {
//   //         if (error.code === error.PERMISSION_DENIED) {
//   //           setErrorMessage("כדי להשתמש בניווט, יש לאשר גישה למיקום שלך.");
//   //         } else {
//   //           setErrorMessage("לא הצלחנו לאתר את המיקום שלך.");
//   //         }
//   //       },
//   //       {
//   //         enableHighAccuracy: true,
//   //         maximumAge: 0,
//   //         timeout: 10000,
//   //       }
//   //     );
//   //   }
//   // }, []);
//   useEffect(() => {
//     if (navigator.geolocation && mapContainerRef.current) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };

//           if (window.google && mapContainerRef.current) {
//             const initializedMap = new google.maps.Map(mapContainerRef.current, {
//               center: userLocation, // מיקום המשתמש
//               zoom: 15,
//               disableDefaultUI: true,
//               zoomControl: true,
//               streetViewControl: false,
//               mapTypeControl: false,
//             });
//             setGoogleMap(initializedMap);

//             const newDirectionsService = new google.maps.DirectionsService();
//             const newDirectionsRenderer = new google.maps.DirectionsRenderer({
//               map: initializedMap,
//               suppressMarkers: false,
//             });

//             setDirectionsService(newDirectionsService);
//             setDirectionsRenderer(newDirectionsRenderer);

//             // התחלת הניווט
//             startNavigation(
//               newDirectionsService,
//               newDirectionsRenderer,
//               setErrorMessage,
//               currentIndex,
//               waypoints,
//               setInstructions,
//               setCurrentIndex
//             );

//             // פוקוס מחדש על מיקום המשתמש
//             google.maps.event.addListenerOnce(newDirectionsRenderer, "directions_changed", () => {
//               initializedMap.setCenter(userLocation);
//               initializedMap.setZoom(15);
//             });
//           }
//         },
//         (error) => {
//           if (error.code === error.PERMISSION_DENIED) {
//             setErrorMessage("כדי להשתמש בניווט, יש לאשר גישה למיקום שלך.");
//           } else {
//             setErrorMessage("לא הצלחנו לאתר את המיקום שלך.");
//           }
//         },
//         {
//           enableHighAccuracy: true,
//           maximumAge: 0,
//           timeout: 10000,
//         }
//       );
//     }
//   }, []);

//   return (
//     <div className="h-screen flex flex-col items-center">
//       <div
//         className="p-5 flex flex-col flex-1 justify-center bg-gray-100 w-[80%] mt-4 border-r-2 border-black"
//         dir="rtl"
//       >
//         <h3>הוראות ניווט:</h3>
//         <p>{instructions}</p>
//         {errorMessage && (
//           <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
//         )}
//       </div>
//       <Script
//         src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyD3kFjuuxQTBDSd3D8aVx0YqtFxa9onxdI&libraries=places`}
//         strategy="beforeInteractive"
//       />
//       <div
//         ref={mapContainerRef}
//         style={{ blockSize: "85%", inlineSize: "80%" }}
//         className="border border-black rounded-xl m-4"
//       />
//     </div>
//   );
// };

// export default RealtimeNavigation;
