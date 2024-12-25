"use client";
import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import RealtimeNavigationProps from "@/app/types/props/RealtimeNavigationProps";

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

  // const startNavigation = (
  //   service: google.maps.DirectionsService,
  //   renderer: google.maps.DirectionsRenderer
  // ) => {
  //   navigator.geolocation.watchPosition(
  //     (position) => {
  //       const currentLocation = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       };

  //       updateDirections(currentLocation, service, renderer);
  //     },
  //     (error) => {
  //       console.error("Error getting location", error);
  //     },
  //     {
  //       enableHighAccuracy: true, // מבקש דיוק גבוה יותר
  //       maximumAge: 0, // לא לשמור את המיקום הקודם
  //       timeout: 50000, // הזמן המקסימלי שמחכים לפני שנכשל אם לא מצאו מיקום (במילישניות)
  //     }
  //   );
  // };

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

        setErrorMessage(null); // איפוס הודעת השגיאה במקרה של הצלחה
        updateDirections(currentLocation, service, renderer);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setErrorMessage("כדי להשתמש בניווט, יש לאשר גישה למיקום שלך.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setErrorMessage(
            "לא ניתן לגשת למיקום כרגע. בדוק את ההגדרות או נסה שוב מאוחר יותר."
          );
        } else if (error.code === error.TIMEOUT) {
          setErrorMessage("לא הצלחנו לאתר את המיקום שלך בזמן סביר. נסה שוב.");
        } else {
          setErrorMessage("אירעה שגיאה בלתי צפויה בגישה למיקום.");
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 50000,
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

  // return (
  //   <>
  //     <Script
  //       src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyD3kFjuuxQTBDSd3D8aVx0YqtFxa9onxdI&libraries=places`}
  //       strategy="beforeInteractive"
  //     />
  //     <div
  //       ref={mapContainerRef}
  //       style={{ blockSize: "80vh", inlineSize: "100%" }}
  //     />
  //     <div style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
  //       <h3>הוראות ניווט:</h3>
  //       <p>{instructions}</p>
  //     </div>
  //   </>
  // );
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
