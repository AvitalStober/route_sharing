// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   GoogleMap,
//   LoadScript,
//   Marker,
//   DirectionsRenderer,
// } from "@react-google-maps/api";

// export interface RealtimeNavigationProps {
//   route: { lat: number; lng: number }[];
// }

// const RealtimeNavigation: React.FC<RealtimeNavigationProps> = ({ route }) => {
//   const [userPosition, setUserPosition] = useState<{
//     lat: number;
//     lng: number;
//   } | null>(null);
//   const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false); // מצב אם ה-Google Maps API נטען
//   const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null); // טיפוס DirectionsResult
//   const [currentStep, setCurrentStep] = useState(0); // הצעד הנוכחי במסלול

//   // מעקב אחר מיקום המשתמש
//   useEffect(() => {
//     const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setUserPosition({ lat: latitude, lng: longitude });
//         console.log(position);
//       },
//       (error) => {
//         console.error("Error getting position:", error);
//       },
//       { enableHighAccuracy: true }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   // עדכון הוראות כיוון לאחר שינוי מיקום
//   useEffect(() => {
//     if (userPosition) {
//       const directionsService = new window.google.maps.DirectionsService();
//       const destination = route[route.length - 1]; // היעד הוא הנקודה האחרונה במסלול
//       directionsService.route(
//         {
//           origin: userPosition,
//           destination,
//           travelMode: window.google.maps.TravelMode.WALKING,
//         },
//         (result, status) => {
//           if (status === "OK") {
//             setDirections(result); // הגדרת directions כ-DirectionsResult
//           } else {
//             console.error("Directions request failed due to " + status);
//           }
//         }
//       );
//     }
//   }, [userPosition, route]);

//   // בדיקת האם המיקום הנוכחי קרוב לנקודת הצעד הנוכחי
//   useEffect(() => {
//     if (userPosition && route[currentStep]) {
//       console.log(route[currentStep]);
//       const { lat, lng } = route[currentStep];
//       const distance = getDistance(userPosition, { lat, lng });

//       if (distance < 20) { // אם המיקום קרוב לנקודה
//         if (currentStep < route.length - 1) {
//           setCurrentStep(prevStep => prevStep + 1);
//           alert(`הגעת לנקודה ${currentStep + 1}. תמשיך לנקודה הבאה!`);
//         } else {
//           alert("סיימת את המסלול! כל הכבוד!");
//         }
//       }
//     }
//   }, [userPosition, currentStep, route]);

//   // חישוב מרחק בין שתי נקודות (נוסחת Haversine)
//   const getDistance = (
//     pos1: { lat: number; lng: number },
//     pos2: { lat: number; lng: number }
//   ) => {
//     const R = 6371e3; // מטרים
//     const φ1 = (pos1.lat * Math.PI) / 180;
//     const φ2 = (pos2.lat * Math.PI) / 180;
//     const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
//     const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

//     const a =
//       Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c;
//   };

//   // פונקציה שתתעדכן כאשר ה-Google Maps API נטען
//   const handleScriptLoad = () => {
//     setGoogleMapsLoaded(true);
//   };

//   return (
//     <LoadScript
//       googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLMAPS_API_KEY || ""}
//       onLoad={handleScriptLoad} // set googleMapsLoaded to true once the script loads
//     >
//       <GoogleMap
//         center={userPosition || route[0]} // התמקדות במיקום המשתמש
//         zoom={16}
//         options={{
//           zoomControl: false,
//           streetViewControl: false,
//           mapTypeControl: false,
//           fullscreenControl: false,
//         }}
//         mapContainerStyle={{ blockSize: "100vh", inlineSize: "100%" }}
//       >
//         {/* הצגת הוראות כיוון על המפה */}
//         {directions && googleMapsLoaded && (
//           <DirectionsRenderer directions={directions} />
//         )}

//         {/* מיקום המשתמש */}
//         {userPosition && googleMapsLoaded && (
//           <Marker
//             position={userPosition}
//             icon={{
//               url: "https://maps.google.com/mapfiles/kml/shapes/arrow.png",
//               scaledSize: new window.google.maps.Size(50, 50), // גודל מותאם
//             }}
//           />
//         )}

//         {/* נקודות המסלול */}
//         {route.map((point, index) => (
//           <Marker
//             key={index}
//             position={point}
//             label={{
//               text: `${index + 1}`,
//               color: "white",
//               fontSize: "12px",
//             }}
//             icon={
//               googleMapsLoaded
//                 ? {
//                     path: window.google.maps.SymbolPath.CIRCLE,
//                     fillColor: "red",
//                     fillOpacity: 1,
//                     strokeColor: "white",
//                     strokeWeight: 2,
//                     scale: 8,
//                   }
//                 : undefined // לא שולחים שום אייקון אם ה-Google Maps API לא נטען
//             }
//           />
//         ))}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default RealtimeNavigation;

"use client";
import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import RealtimeNavigationProps from "@/app/types/props/RealtimeNavigationProps"

const RealtimeNavigation: React.FC<RealtimeNavigationProps> = ({
  waypoints = []
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null); // שמירת רפרנס לקונטיינר של המפה
  const [, setGoogleMap] = useState<google.maps.Map | null>(null); // שמירת אובייקט המפה
  const [, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // אינדקס הנקודה הנוכחית במסלול
  const [instructions, setInstructions] = useState<string>(""); // הנחיות ניווט

  // רשימת נקודות (waypoints) במסלול
  // const waypoints = [
  //   { lat: 31.283473943711826, lng: 34.80692328741589 },
  //   { lat: 31.253240274324877, lng: 34.76785391840664 },
  //   { lat: 31.322120716747207, lng: 34.633356568908404 },
  //   { lat: 31.357306341200307, lng: 34.63294494003394 },
  //   { lat: 31.42998601600043, lng: 34.56840026433961 },
  //   { lat: 31.417104918536843, lng: 34.57161399162095 },

    // { lat: 32.064873, lng: 34.792394 },
    // { lat: 32.061245, lng: 34.789543 },
    // { lat: 32.065678, lng: 34.795123 },
    // { lat: 32.067234, lng: 34.790567 },
    // { lat: 32.059876, lng: 34.79489 },
  // ];

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
      startNavigation(newDirectionsService, newDirectionsRenderer);
    }
  }, []);

  const startNavigation = (
    service: google.maps.DirectionsService,
    renderer: google.maps.DirectionsRenderer
  ) => {
    navigator.geolocation.watchPosition(
      (position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        updateDirections(currentLocation, service, renderer);
      },
      (error) => {
        console.error("Error getting location", error);
      },
      {
        enableHighAccuracy: true, // מבקש דיוק גבוה יותר
        maximumAge: 0, // לא לשמור את המיקום הקודם
        timeout: 50000, // הזמן המקסימלי שמחכים לפני שנכשל אם לא מצאו מיקום (במילישניות)
      }
    );
  };

  const updateDirections = (
    currentLocation: google.maps.LatLngLiteral,
    service: google.maps.DirectionsService,
    renderer: google.maps.DirectionsRenderer
  ) => {
    if (currentIndex >= waypoints.length) {
      setInstructions("הגעת ליעד!");
      return;
    }

    const remainingWaypoints = waypoints.slice(currentIndex).map((point) => ({
      location: point,
      stopover: false,
    }));

    // היעד יהיה הנקודה האחרונה במסלול
    const destination = waypoints[waypoints.length - 1];

    service.route(
      {
        origin: currentLocation,
        destination: destination,
        waypoints: remainingWaypoints,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          renderer.setDirections(response);

          // מציאת הצעד הבא
          const leg = response!.routes[0].legs[0];
          const nextStep = getNextStep(leg);

          setInstructions(nextStep);

          // בדיקת אם הגעת לנקודה הבאה במסלול
          const nextWaypoint = waypoints[currentIndex];
          const distance = haversineDistance(currentLocation, nextWaypoint);

          if (distance < 0.05) {
            setCurrentIndex((prevIndex) => prevIndex + 1); // עדכון אינדקס לנקודה הבאה
          }
        } else {
          console.error("Directions request failed", status);
        }
      }
    );
  };

  const getNextStep = (leg: google.maps.DirectionsLeg) => {
    if (leg.steps.length > 0) {
      return leg.steps[0].instructions.replace(/<[^>]*>?/gm, ""); // מסיר תגיות HTML
    }
    return "המשך ללכת ישר.";
  };

  const haversineDistance = (
    coords1: google.maps.LatLngLiteral,
    coords2: google.maps.LatLngLiteral
  ) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // רדיוס כדור הארץ בק"מ
    const dLat = toRad(coords2.lat - coords1.lat);
    const dLng = toRad(coords2.lng - coords1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coords1.lat)) *
        Math.cos(toRad(coords2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // מרחק בק"מ
  };

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
      <div style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
        <h3>הוראות ניווט:</h3>
        <p>{instructions}</p>
      </div>
    </>
  );
};

export default RealtimeNavigation;
