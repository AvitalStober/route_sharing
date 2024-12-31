// import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import { calculateDistance } from "./routesFunctions";

export const startNavigation = (
  service: google.maps.DirectionsService,
  renderer: google.maps.DirectionsRenderer,
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
  currentIndex: number,
  waypoints: {
    lat: number;
    lng: number;
  }[],
  setInstructions: React.Dispatch<React.SetStateAction<string>>,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  googleMap: google.maps.Map | null
  // router: AppRouterInstance
) => {
  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      // if (
      //   calculateDistance(
      //     currentLocation.lat,
      //     currentLocation.lng,
      //     waypoints[0].lat,
      //     waypoints[0].lng
      //   ) > 2000
      // ) {
      //   const confirmStartNavigation = window.confirm(
      //     "המסלול שבחרת רחוק ממיקומך, האם תרצה בכל זאת לצאת לדרך?"
      //   );
      //   if (!confirmStartNavigation) {
      //     navigator.geolocation.clearWatch(watchId); // עצור את המעקב
      //     router.push("/pages/home");
      //     return; // יציאה מהפונקציה
      //   }
      // }

      setErrorMessage(null);
      updateDirections(
        currentLocation,
        service,
        renderer,
        googleMap!, // מעביר את אובייקט המפה
        currentIndex,
        waypoints,
        setInstructions,
        setCurrentIndex
      );
      
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

  // עצור את המעקב אם הקומפוננטה אינה בשימוש יותר
  return () => {
    navigator.geolocation.clearWatch(watchId);
  };
};

// const updateDirections = (
//   currentLocation: google.maps.LatLngLiteral,
//   service: google.maps.DirectionsService,
//   renderer: google.maps.DirectionsRenderer,
//   currentIndex: number,
//   waypoints: {
//     lat: number;
//     lng: number;
//   }[],
//   setInstructions: React.Dispatch<React.SetStateAction<string>>,
//   setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
// ) => {
//   if (currentIndex >= waypoints.length) {
//     setInstructions("הגעת ליעד!");
//     return;
//   }

//   const remainingWaypoints = waypoints.slice(currentIndex).map((point) => ({
//     location: point,
//     stopover: false,
//   }));

//   // היעד יהיה הנקודה האחרונה במסלול
//   // const destination = waypoints[waypoints.length - 1];
//   debugger;
//   service.route(
//     {
//       origin: currentLocation,
//       destination: currentLocation,
//       waypoints: remainingWaypoints,
//       travelMode: google.maps.TravelMode.WALKING,
//     },
//     (response, status) => {
//       if (status === google.maps.DirectionsStatus.OK) {
//         renderer.setDirections(response);

//         // מציאת הצעד הבא
//         const leg = response!.routes[0].legs[0];
//         const nextStep = getNextStep(leg);

//         setInstructions(nextStep);

//         // בדיקת אם הגעת לנקודה הבאה במסלול
//         const nextWaypoint = waypoints[currentIndex];
//         const distance = haversineDistance(currentLocation, nextWaypoint);

//         if (distance < 0.05) {
//           setCurrentIndex((prevIndex) => prevIndex + 1); // עדכון אינדקס לנקודה הבאה
//         }
//       } else {
//         console.error("Directions request failed", status);
//       }
//     }
//   );

//   debugger;
// };

const updateDirections = (
  currentLocation: google.maps.LatLngLiteral,
  service: google.maps.DirectionsService,
  renderer: google.maps.DirectionsRenderer,
  map: google.maps.Map, // הוספת המפה כפרמטר
  currentIndex: number,
  waypoints: {
    lat: number;
    lng: number;
  }[],
  setInstructions: React.Dispatch<React.SetStateAction<string>>,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  if (currentIndex >= waypoints.length) {
    setInstructions("הגעת לנקודת ההתחלה!");
    return;
  }

  const remainingWaypoints = waypoints.slice(currentIndex).map((point) => ({
    location: point,
    stopover: false,
  }));

  // היעד הוא הנקודה הראשונה במסלול (נקודת ההתחלה)
  const destination = waypoints[0];

  service.route(
    {
      origin: currentLocation,
      destination: destination, // יעד = נקודת ההתחלה
      waypoints: remainingWaypoints,
      travelMode: google.maps.TravelMode.WALKING,
    },
    (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        renderer.setDirections(response);
        // עדכון מרכז המפה לנקודה הנוכחית
        map.setCenter(waypoints[currentIndex]);
        

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
